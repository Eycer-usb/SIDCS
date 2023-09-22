import { Component, OnInit } from '@angular/core';
import { environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  isVerified = false;

  constructor( private http: HttpClient, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const token = params['token'];
      this.verifyEmail(token);
    });
  }

  public verifyEmail(token: string): void {
    const url = `${environment.apiUrl}/auth/verify-email/${token}`;
    this.http.get(url).subscribe(
    {
      complete: () => {
        console.log('Email verificado');
        this.isVerified = true;
      },
      error: (err: any) => {
        console.log(err);
      }
    }
    );
  }
  
}
