import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ViewLocationService {

  constructor( private http: HttpClient) { }
  token: string = localStorage.getItem('jwt') || '';
  options: any = { headers: { 'Authorization': `Bearer ${this.token}` } };

  getData(zonaId?: number, localidadId?: number, 
    tipoCentroSaludId?: string, tipoGrupoMedicoId?: number ): Observable<any>{
    const url = environment.apiUrl + "/centro-salud";
    this.options.params = {
      zonaId: zonaId,
      localidadId: localidadId,
      tipoCentroDeSalud: tipoCentroSaludId,
      tipoGrupoMedico: tipoGrupoMedicoId
    }
    return this.http.get(url, this.options);
  }
}
