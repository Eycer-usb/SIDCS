import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AuthService } from '../../auth.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-token-dialog',
  templateUrl: './token-dialog.component.html',
  styleUrls: ['./token-dialog.component.scss']
})
export class TokenDialogComponent {
  constructor(public dialogRef: MatDialogRef<TokenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string, password: string },
    private services: AuthService, private snack: MatSnackBar) {}

  token = new FormControl('', [Validators.required, Validators.minLength(6),
    Validators.pattern('^[0-9]*$')]);

  verifyCode() {
    console.log('Verifying Code');
    this.services.requestChangePassword(this.data.email, this.data.password, this.token.value!, {
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        console.log(err);
        if(err.status == 500){
          this.snack.open("El token ingresado es incorrecto", 'OK', { duration: 5000 });
          this.token.setErrors({invalid: true});
        }
        else
        this.snack.open("Ocurrio un error al verificar el token", 'OK', { duration: 5000 });
      }
    })    
  }
}
