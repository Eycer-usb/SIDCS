import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  passwordValidators = [
    Validators.required, 
    Validators.minLength(5), 
    Validators.maxLength(20), 
    Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%&*:])[a-zA-Z0-9@#$%&*:]+$')
  ]

  emailValidators = [
    Validators.required,
    Validators.email, 
    Validators.maxLength(20), 
    Validators.minLength(5)
  ]
    
  // Login form
  loginForm = this.fb.group({
    email: ['', this.emailValidators ],
    password: ['', this.passwordValidators ]
  });

  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private router: Router,
              private snack: MatSnackBar, private services: AuthService) { }

  // Getters
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  
  // Login Method send request to server and save jwt in localstorage
  login() {
    const config = {
      next: (response : any) => {
        localStorage.setItem('jwt', response.access_token);
        this.router.navigate(['../dashboard']);
      },
      error: (err: any) => {
        let message: string = err.error.statusCode == 409 ? 'Usuario no encontrado' : 'Ocurrio un error';
        message = err.error.statusCode == 401 ? 'Contraseña Incorrecta' : message;
        message = err.error.statusCode == 402 ? 'Verifique su correo para iniciar sesión' : message;
        this.snack.open(message, 'Close', { duration: 3000 });
      },
      complete: () => console.log('Login request finished')

    }
    this.services.requestLogin(this.loginForm, config)
  }
}
