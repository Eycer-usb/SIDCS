import { Component } from '@angular/core';
import { ControlConfig, FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../validators/passwordMatchValidator';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private fb: FormBuilder, private http: HttpClient,
    private snackbar: MatSnackBar, private router: Router) { }


  hidePassword = true;
  hideConfirmPassword = true;
  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(20), Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%&*:])[a-zA-Z0-9@#$%&*:]+$')]],
    confirmPassword: ['', [Validators.required, passwordMatchValidator()]]
  },
  );
  response: any;
  durationInSeconds = 5;

  get name() { return this.signupForm.get('name'); }
  get lastname() { return this.signupForm.get('lastname'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  signup() {
    const header = { 'Content-Type': 'application/json' };
    this.http.post( environment.apiUrl + '/auth/register', 
        this.signupForm.value, { headers: header })
        .subscribe(
            {
              complete: () => {
                this.router.navigate(['/']);
                this.snackbar.open('Usuario creado, confirme su correo para iniciar sesión', 'Close', {
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                });
              },
              error: (error) => {
                console.log(error);
                let message = '';
                switch (error.status) {
                  case 500:
                    message = 'Ocurrio un error en el servidor';
                    break;
                  case 409:
                    message = 'El usuario ya se encuentra registrado';
                    break;
                  default:
                    message = 'Ocurrio un error';
                    break;               
                }
                this.snackbar.open(message, 'Close', {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                });
              }
            });
    };

    
  updateConfirmPasswordValidation() {
    this.signupForm.get('confirmPassword')?.updateValueAndValidity();
  }
}
