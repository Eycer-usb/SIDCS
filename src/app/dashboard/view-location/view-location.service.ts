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
    const options = {
      ...this.options,
      params: {
      zonaId: zonaId? zonaId : undefined,
      localidadId: localidadId? localidadId : undefined,
      tipoCentroDeSalud: tipoCentroSaludId? tipoCentroSaludId : undefined,
      tipoGrupoMedicoId: tipoGrupoMedicoId? tipoGrupoMedicoId : undefined
    }
    }
    return this.http.get(url, options);
  }

  delete(element: any): Observable<any> {
    const url = environment.apiUrl + "/" + element.route + "/" + element.id;
    return this.http.delete(url, this.options);
  }
}
