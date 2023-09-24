import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TokenDialogComponent } from './token-dialog/token-dialog.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent {

  constructor(public dialog: MatDialog, private snack: MatSnackBar,
    private services: AuthService, private router: Router) { }
  email : FormControl = new FormControl('', [Validators.required, Validators.email]);
  password : string = '';


  verifyEmail() {
    this.services.isValidEmail(this.email.value, {
      next: () => {
        this.openDialogNewPassword();
      },
      error: (err: any) => {
        if(err.status == 500){
          this.snack.open("El correo ingresado no existe", 'OK', { duration: 5000 });
          this.email.setErrors({invalid: true});
        }
        else
        this.snack.open("Ocurrio un error al verificar el correo", 'OK', { duration: 5000 });
      }
    })
  }
  openDialogNewPassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, 
      {
        data: {password: this.password},
        width: '400px',
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.password = result;
        this.services.requestToken(this.email.value, {
          next: () => {
            this.snack.open("Token de confirmacion enviado al correo", 'OK', { duration: 5000 });
            this.openDialogToken();
          },
          error: (err: any) => {
            console.log(err);
            this.snack.open("Ocurrio un error al solicitar el token al correo", 'OK', { duration: 5000 });
          }
        });
      }
    });
  }

  openDialogToken(): void {
    const dialogRef = this.dialog.open(TokenDialogComponent, 
      {
        data: {email: this.email.value, password: this.password},
        width: '400px',
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
          this.router.navigate(['/login']);
          this.snack.open("Contraseña actualizada correctamente", 'OK', { duration: 5000 });
      }
    });
  }
}
