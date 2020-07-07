import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

 
  constructor(private socket: Socket) { }

  createGame(username: string) {
    this.socket.emit("createGame", {username});
  }

  joinGame(username: string, roomId: string) {
    console.log(roomId);
    console.log(name);
    this.socket.emit("joinGame", {username, roomId})
  }

  makeMove(idx: number, symbol: string, roomId: string) {
    this.socket.emit("makeMove", {idx, symbol, roomId});
  }

  playAgain(result: boolean, roomId: string) {
    this.socket.emit("playAgain", {result, roomId});
  }


  newGame(): Observable<any> {
    return this.socket.fromEvent("newGame");
  }

  player2Joined(): Observable<any> {
    return this.socket.fromEvent("player1");
  }

  joined(): Observable<any> {
    return this.socket.fromEvent("player2");
  }

  turned(): Observable<any> {
    return this.socket.fromEvent("turn");
  }

  win(): Observable<any> {
    return this.socket.fromEvent("win");
  }

  lose(): Observable<any> {
    return this.socket.fromEvent("lose");
  }

  again(): Observable<any> {
    return this.socket.fromEvent("again");
  }

}
