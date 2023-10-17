import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddLocationService } from './add-location.service';
import { Observer, config } from 'rxjs';
import { environment } from 'src/environments/environment';

enum centroType {
  laboratorioClinico,
  grupoMedico,
  clinicaPrivada,
  centroOdontologico,
  centroOftalmologico
}

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router,
    private snack: MatSnackBar, private service: AddLocationService) {}
  zonas: Array<any> = [];
  localidades: Array<any> = [];
  tipoGrupoMedico: Array<any> = [];
  tiposCentroDeSalud: Array<any> = [];

  ngOnInit(): void {
    const error = (error: any) => {
      console.log(error);
      this.snack.open('Ocurrio un error al cargar los datos', 'Cerrar', { duration: 3000 });
    }
    this.service.getZonas(error, this.zonas );
    this.service.getLocalidades(error, this.localidades);
    this.service.getTipoGrupoMedico(error, this.tipoGrupoMedico);
    this.tiposCentroDeSalud = [
      { id: 'laboratorioClinico', nombre: "Laboratorio Clinico" },
      { id: 'grupoMedico', nombre: "Grupo Medico" },
      { id: 'clinicaPrivada', nombre: "Clinica Privada" },
      { id: 'centroOdontologico', nombre: "Centro Odontologico" },
      { id: 'centroOftalmologico', nombre: "Centro Oftalmologico" },
    ]
  }

    tipoCentro: FormControl = new FormControl(null, Validators.required);
    
    genericForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      longitud: ['', Validators.required],
      latitud: ['', Validators.required],
      telefono: ['', Validators.required],
      tamano: ['', Validators.required],
      limpieza: ['', Validators.required],
      demanda: ['', Validators.required],
      localidadId: ['', Validators.required],
      zonaId: ['', Validators.required],
      imagenes: this.fb.array([], [Validators.required]),
    });

    laboratorioClinicoForm = this.fb.group({
      ...this.genericForm.value,
      hematologiaCompleta: [''],
      perfil20: [''],
      perfilTiroideo: [''],
      urocultivo: [''],
      heces: [''],
      orina: [''],
      perfilPreoperatorio: ['']
    });

    grupoMedicoForm = this.fb.group({
      ...this.genericForm.value,
      tipoId: ['', Validators.required],
      medicinaGeneral: [''],
      medicinaInterna: [''],
      pediatria: [''],
      ginecologia: [''],
      obstetricia: [''],
      cardiologia: [''],
      gastro: [''],
      neurologia: [''],
      neumonologia: [''],
      medicinaFyR: [''],
      psiquiatra: [''],
      psicologia: [''],
      rayosXDeTorax: [''],
      tomografiaAbdominalPelvica: [''],
      resonanciaCerebral: [''],
      ecoAbdominal: [''],
      mamografia: [''],
      densitometriaOsea: [''],
      epirometria: [''],
      eeg: [''],
      lamparoscopia: [''],
      pruebaDeEsfuerzoCardio: [''],
      hematologiaCompleta: [''],
      perfil20: [''],
      perfilTiroideo: [''],
      urocultivo: [''],
      heces: [''],
      orina: [''],
      perfilPreoperatorio: [''],
      apendicectomia: [''],
      colecistectomia: [''],
      herniaIngiunal: [''],
      cesaerea: [''],
      partoNormal: [''],
      hospitalizacion: [''],
    });

    clinicaPrivadaForm = this.fb.group({
      ...this.genericForm.value,
      emergencia: [''],
      medicinaGeneral: [''],
      medicinaInterna: [''],
      pediatria: [''],
      ginecologia: [''],
      obstetricia: [''],
      cardiologia: [''],
      rayosXDeTorax: [''],
      tomografiaAbdominalPelvica: [''],
      resonanciaCerebral: [''],
      ecoAbdominal: [''],
      mamografia: [''],
      densitometriaOsea: [''],
      hematologiaCompleta: [''],
      perfil20: [''],
      perfilTiroideo: [''],
      urocultivo: [''],
      heces: [''],
      orina: [''],
      perfilPreoperatorio: [''],
      apendicectomia: [''],
      colecistectomiaLamparoscopica: [''],
      herniorrafiaIngiunal: [''],
      cesarea: [''],
      partoNormal: [''],
      hospitalizacion: [''],
    });

    centroOftalmologicoForm = this.fb.group({
      ...this.genericForm.value,
      oftalmologiaGeneralDesde: [''],
      oftalmologiaGeneralHasta: [''],
      tratamientoGlaucomaCataratas: [false],
      protesisOculares: [false],
      tratamientosEspecializados: [false],
      oncologia: [false],
      otros: [false],
    });

    centroOdontologicoForm = this.fb.group({
      ...this.genericForm.value,
      odontologiaGeneralDesde: ['', Validators.required],
      odontologiaGeneralHasta: [''],
      ortodoncia: [false],
      endodoncia: [false],
      cirugiaBucal: [false],
      protesis: [false],
      rayosX: [false],
    });

    submit(){
      const config: Partial<Observer<Object>> = {
        complete: () => {
          this.router.navigate(['/add-location']);
          this.snack.open('Centro de Salud creado correctamente', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000
          });
        },
        error: (error: any) => {
          console.log(error);
          let message = '';
          switch (error.status) {
            case 500:
              message = 'Ocurrio un error en el servidor';
              break;
            case 409:
              message = 'El centro de salud ya se encuentra registrado';
              break;
            default:
              message = 'Ocurrio un error';
              break;               
          }
          this.snack.open(message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      };
      switch(this.tipoCentro?.value){
        case centroType.laboratorioClinico:
          this.service.addLaboratorioClinico(this.laboratorioClinicoForm, config)
          break;
        case centroType.grupoMedico:
          this.service.addGrupoMedico(this.grupoMedicoForm, config)
          break;
        case centroType.clinicaPrivada:
          this.service.addClinicaPrivada(this.clinicaPrivadaForm, config)
          break;
        case centroType.centroOdontologico:
          this.service.addCentroOdontologico(this.centroOdontologicoForm, config)
          break;
        case centroType.centroOftalmologico:
          this.service.addCentroOftalmologico(this.centroOftalmologicoForm, config)
          break;
        default:
          this.snack.open('Error con el tipo de centro de salud', 'Cerrar', {
            duration: 3000,
          });
          break;
      }

    }

    endpoint = environment.apiUrl + "/centro-salud/storage?path=uploads/";
    async onFileSelected(event: any) {
      const file: File = event.target.files[0];
      await this.service.uploadFile(file, {
        error: (error: any) => {
          console.log(error);
          this.snack.open('Ocurrio un error al subir la imagen', 'Cerrar', { duration: 3000 });
        },
        next: (res: any) => {
          this.genericForm.value.imagenes!.push(res[0].filename);
        }
      });
    }

    deleteFile(filename:any) {
      this.service.deleteFile(filename, (error: any) => {
        console.log(error);
        this.snack.open('Ocurrio un error al eliminar la imagen', 'Cerrar', { duration: 3000 });
      }, this.genericForm.value.imagenes!);
    }

    get nombre () { return this.genericForm.get('nombre'); }
    get direccion () { return this.genericForm.get('direccion'); }
    get longitud () { return this.genericForm.get('longitud'); }
    get latitud () { return this.genericForm.get('latitud'); }
    get telefono () { return this.genericForm.get('telefono'); }
    get tamano () { return this.genericForm.get('tamano'); }
    get limpieza () { return this.genericForm.get('limpieza'); }
    get demanda () { return this.genericForm.get('demanda'); }
    get localidadId () { return this.genericForm.get('localidadId'); }
    get zonaId () { return this.genericForm.get('zonaId'); }
    get imagenes () { return this.genericForm.get('imagenes'); }
    get tipoCentroSalud() { return this.tipoCentro; }
}
