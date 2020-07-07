import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog2',
  template:`
  <nb-card>
      <nb-card-header>Enter your name</nb-card-header>
      <nb-card-body>
        <input #room nbInput placeholder="RoomId">
        <input #username nbInput placeholder="Username" value="Michi2">
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="danger" (click)="cancel()">Cancel</button>
        <button nbButton status="success" (click)="submit(room.value, username.value)">Submit</button>
      </nb-card-footer>
    </nb-card>
  `,
  styleUrls: ['./dialog2.component.scss']
})
export class Dialog2Component implements OnInit {

  constructor(private dialogRef: NbDialogRef<Dialog2Component>) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  submit(room, username) {
    this.dialogRef.close({room, username});
  }

}
