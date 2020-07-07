import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog',
  template: `
  <nb-card>
      <nb-card-header>Enter your name</nb-card-header>
      <nb-card-body>
        <input #username nbInput placeholder="Username" value="Michi">
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="danger" (click)="cancel()">Cancel</button>
        <button nbButton status="success" (click)="submit(username.value)">Submit</button>
      </nb-card-footer>
    </nb-card>
  `,
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  submit(username) {
    this.dialogRef.close(username);
  }

}
