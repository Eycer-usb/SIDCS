import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddLocationService {

  constructor(private http: HttpClient) { }
  token: string = localStorage.getItem('jwt') || '';
  options: any = { headers: { 'Authorization': `Bearer ${this.token}` } };
  
  // Add Location
  async addLaboratorioClinico( generic: FormGroup, form: FormGroup, config: Partial<Observer<Object>> ) {

    return this.http.post(environment.apiUrl + "/laboratorio-clinico",
    {...form.value, ...generic.value}, this.options).subscribe(config);
  }
  addGrupoMedico(generic: FormGroup, form: FormGroup, config: Partial<Observer<Object>>) {
    return this.http.post(environment.apiUrl + "/grupo-medico",
    {...form.value, ...generic.value}, this.options).subscribe(config);
  }
  addClinicaPrivada(generic: FormGroup, form: FormGroup, config: Partial<Observer<Object>>) {
    form.value.emergencia = +form.value.emergencia;
    return this.http.post(environment.apiUrl + "/clinica-privada",
    {...form.value, ...generic.value}, this.options).subscribe(config);
  }
  addCentroOdontologico(generic: FormGroup, form: FormGroup, config: Partial<Observer<Object>>) {
    return this.http.post(environment.apiUrl + "/centro-odontologico",
    {...form.value, ...generic.value}, this.options).subscribe(config);
  }
  addCentroOftalmologico(generic: FormGroup, form: FormGroup, config: Partial<Observer<Object>>) {
    return this.http.post(environment.apiUrl + "/centro-oftalmologico",
    {...form.value, ...generic.value}, this.options).subscribe(config);
  }

  // Update Location
  updateLaboratorioClinico(generic: FormGroup, form: FormGroup, config: Partial<Observer<Object>>) {
    return this.http.patch(environment.apiUrl + "/laboratorio-clinico/" + generic.value.id,
    {...form.value, ...generic.value}, this.options).subscribe(config);
  }
  updateGrupoMedico(generic: FormGroup, form: FormGroup, config: Partial<Observer<Object>>) {
    return this.http.patch(environment.apiUrl + "/grupo-medico/" + generic.value.id,
    {...form.value, ...generic.value}, this.options).subscribe(config);
  }
  updateClinicaPrivada(generic: FormGroup, form: FormGroup, config: Partial<Observer<Object>>) {
    return this.http.patch(environment.apiUrl + "/clinica-privada/" + generic.value.id,
    {...form.value, ...generic.value}, this.options).subscribe(config);
  }
  updateCentroOdontologico(generic: FormGroup, form: FormGroup, config: Partial<Observer<Object>>) {
    return this.http.patch(environment.apiUrl + "/centro-odontologico/" + generic.value.id,
    {...form.value, ...generic.value}, this.options).subscribe(config);
  }
  updateCentroOftalmologico(generic: FormGroup, form: FormGroup, config: Partial<Observer<Object>>) {
    return this.http.patch(environment.apiUrl + "/centro-oftalmologico/" + generic.value.id,
    {...form.value, ...generic.value}, this.options).subscribe(config);
  }

  // Get Data
  getZonas(errorFn: Function, zonas: Array<any>) {
    return this.http.get(environment.apiUrl + "/zona", 
    { headers: { 'Authorization': `Bearer ${this.token}` } })
    .subscribe(this.getConfig(zonas, errorFn));
  }
  getLocalidades(errorFn: Function, localidades: Array<any>) {
    return this.http.get(environment.apiUrl + "/localidad",
    { headers: { 'Authorization': `Bearer ${this.token}` } })
    .subscribe(this.getConfig(localidades, errorFn));
  }
  getTipoGrupoMedico(errorFn: Function, tipoGrupoMedico: Array<any>) {
    return this.http.get(environment.apiUrl + "/tipo-grupo-medico",
    { headers: { 'Authorization': `Bearer ${this.token}` } })
    .subscribe(this.getConfig(tipoGrupoMedico, errorFn));
  }

  async uploadFile(image: File, config:any) {
    const formData = new FormData();
    formData.append('files', image);
    this.http.post( environment.apiUrl + "/centro-salud/upload-images", formData,
      {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }
    ).subscribe(config);    
  }

  getConfig(select: Array<any>, errorFn: Function) {
    return {
      error(err:any) {
        errorFn(err);
      },
      next: (data: any) => {
        data.forEach((element: any) => {select.push({id: element.id, nombre: element.descripcion})});
      }
    }
  }

  deleteFile(filename: any, errorFn: Function, images: Array<any>) {
    this.http.delete(environment.apiUrl + "/centro-salud/storage/" + filename,
    { headers: { 'Authorization': `Bearer ${this.token}` } })
    .subscribe({
      error(error:any) {errorFn(error)},
    })

    images.splice(images.indexOf(filename), 1);
  }
}
