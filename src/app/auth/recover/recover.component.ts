import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TokenDialogComponent } from './token-dialog/token-dialog.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent {

  constructor(public dialog: MatDialog) { }
  email : FormControl = new FormControl('', [Validators.required, Validators.email]);

  requestVerificationCode() {
    console.log('Sending Code');
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, 
      {
        width: '400px',
      }
    );
  }

}
