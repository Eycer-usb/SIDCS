import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor( private http: HttpClient ) { }

  /**
   * Refresh Login Token Function send a request to server to refresh the token and if 
   * the token is valid, return true
   */
  async refreshLogin(): Promise<Object | undefined> {
    const token = localStorage.getItem('jwt');
    const headers = { Authorization: `Bearer ${token}` || '' };
    const obs = this.http.post(`${environment.apiUrl}/auth/refresh-token`, null, { headers }  )
    try {
      return await firstValueFrom(obs);
    }
    catch (err) {
      console.log(err);
      return undefined;
    }
  }
}
