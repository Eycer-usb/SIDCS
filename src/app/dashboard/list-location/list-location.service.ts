import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ListLocationService {

  constructor( private http: HttpClient) { }
  token: string = localStorage.getItem('jwt') || '';
  options: any = { headers: { 'Authorization': `Bearer ${this.token}` } };

  getData( formValues: any ): Observable<any>{
    const url = environment.apiUrl + "/centro-salud";
    const options = {
      ...this.options,
      body: formValues
    }
    return this.http.post(url, options);
  }

  delete(element: any): Observable<any> {
    const url = environment.apiUrl + "/" + element.route + "/" + element.id;
    return this.http.delete(url, this.options);
  }

  // Get Data
  getZonas() {
    return this.http.get(environment.apiUrl + "/zona", 
    { headers: { 'Authorization': `Bearer ${this.token}` } });
  }
  getLocalidades(zonas: Array<number>) {
    return this.http.get(environment.apiUrl + "/localidad",
    { headers: { 'Authorization': `Bearer ${this.token}` }, params: { zonas: zonas } });
  }
  getTipoGrupoMedico() {
    return this.http.get(environment.apiUrl + "/tipo-grupo-medico",
    { headers: { 'Authorization': `Bearer ${this.token}` } });
  }
}
