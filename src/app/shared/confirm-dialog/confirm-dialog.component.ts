import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title class="mat-headline">Confirm</h1>
    <div mat-dialog-content class="dialog-content">
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions class="dialog-actions">
      <button mat-raised-button color="primary" (click)="onClose(false)">Stay</button>
      <button mat-raised-button color="warn" (click)="onClose(true)">Leave</button>
    </div>
  `,
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onClose(choice: boolean) {
    this.dialogRef.close(choice);
  }
}
