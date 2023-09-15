import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-token-dialog',
  templateUrl: './token-dialog.component.html',
  styleUrls: ['./token-dialog.component.scss']
})
export class TokenDialogComponent {
  constructor(public dialogRef: MatDialogRef<TokenDialogComponent>) {}
  token = '';

  onNoClick(): void {
    this.dialogRef.close();
  }
  verifyCode() {
    console.log('Verifying Code');
    this.dialogRef.close();
  }
}
