import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-end-dialog',
  template: `
  <nb-card>
      <nb-card-header>{{message}}</nb-card-header>
      <nb-card-body>
        Play again?
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="danger" (click)="accept()">Yes</button>
        <button nbButton status="success" (click)="reject()">No</button>
      </nb-card-footer>
    </nb-card>
  `,
  styleUrls: ['./end-dialog.component.scss']
})
export class EndDialogComponent implements OnInit {

  constructor(private dialogRef: NbDialogRef<EndDialogComponent>) { }

  @Input() message: string;

  ngOnInit(): void {
  }

  accept() {
    this.dialogRef.close(true);
  }

  reject() {
    this.dialogRef.close(false);
  }
}
