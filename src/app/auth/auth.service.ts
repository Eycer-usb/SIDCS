import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment }  from '../../environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

    // Logout Method remove jwt from localstorage and redirect to login
    logout() {
      localStorage.removeItem('jwt');
    }

    // isLoggedIn Method check if user is logged in
    isLoggedIn() {
      return localStorage.getItem('jwt') ? true : false;
    }

    requestLogin(loginForm: FormGroup, config: any): void {
      this.http.post(
        `${environment.apiUrl}/auth/login`,
        loginForm.value,
      ).subscribe(config);
    }

    requestSignup(signupForm: FormGroup, config: any): void {
      this.http.post(
        `${environment.apiUrl}/auth/register`,
        signupForm.value,
      ).subscribe(config);
    }

    requestToken(email: string, config: any): void {
      this.http.post(
        `${environment.apiUrl}/auth/recover-password-code`,
        { email }
      ).subscribe(config);
    }

    requestChangePassword(email: string, password: string, token: string, config: any): void {
      this.http.post(
        `${environment.apiUrl}/auth/recover-password`,
        { email, password, verification_code: parseInt(token) }
      ).subscribe(config);
    }

    isValidEmail(email: string, config: any): void {
      this.http.post(
        `${environment.apiUrl}/auth/user/exists`,
        { email }
      ).subscribe(config);
    }
  }
