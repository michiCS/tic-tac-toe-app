import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { NbDialogService } from '@nebular/theme';
import { DialogComponent } from '../dialog/dialog.component';
import { ConcatSource } from 'webpack-sources';
import { Dialog2Component } from '../dialog2/dialog2.component';
import { EndDialogComponent } from '../end-dialog/end-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  tiles: string[];
  player1: string = "???";
  player2: string = "???";

  ready: boolean = false;
  starting: boolean;
  waiting: boolean;

  currentRoom: string;

  constructor(private gameService: GameService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.tiles = Array(9).fill("");
  }

  get symbol() {
    return this.starting ? "X" : "O";
  }


  createGame() {
    this.dialogService.open(DialogComponent)
      .onClose.subscribe(username => {
        if (username) {
          this.gameService.newGame().subscribe(x => {
            console.log(x);
            this.currentRoom = x.roomId;
            this.player1 = x.player1;
          });
          this.gameService.createGame(username);
          this.gameService.player2Joined().subscribe(x => {
            this.init(x);
          })
        }
      })
  }


  joinGame() {
    this.dialogService.open(Dialog2Component)
      .onClose.subscribe(data => {
        if (data.room && data.username) {
          this.gameService.joinGame(data.username, data.room);
          this.gameService.joined().subscribe(x => {
            this.currentRoom = x.roomId;
            this.player1 = x.player1;
            this.init(x);
          });
        }
      })
  }

  init(data) {
    this.ready = true;
    this.starting = data.starting;
    this.waiting = !this.starting;
    this.player2 = data.player2;

    this.gameService.turned().subscribe(x => {
      this.tiles = x.tiles;
      this.waiting = !this.waiting;
    });

    this.gameService.lose().subscribe(x => {
      this.dialogService.open(EndDialogComponent, {
        context: {
          message: "You lost!"
        }
      }).onClose.subscribe(result => {
        this.gameService.playAgain(result, this.currentRoom);
      });
    });

    this.gameService.win().subscribe(x => {
      this.dialogService.open(EndDialogComponent, {
        context: {
          message: "You won!"
        }
      }).onClose.subscribe(result => {
        this.gameService.playAgain(result, this.currentRoom);
      });
    });

    this.gameService.again().subscribe(x => {
      this.tiles = x.tiles;
      if(x.result) {
        this.waiting = !this.starting;
      }
      else {
        this.waiting = false;
        this.player1 = "???";
        this.player2 = "???";
        this.currentRoom = undefined;
        this.ready = false;
      }

    })
  }

  makeMove(idx: number) {
    if (!this.tiles[idx] && !this.waiting) {
      console.log("Aha");
      this.tiles.splice(idx, 1, this.symbol);
      this.waiting = true;
      this.gameService.makeMove(idx, this.symbol, this.currentRoom);
    }
  }
}


