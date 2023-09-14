import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  // Getters
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login() {
    console.log(this.loginForm.value);
  }
}
