import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  // Selects data
  zonas: Array<any> = [];
  localidades: Array<any> = [];
  tiposGrupoMedico: Array<any> = [];
  tiposCentroDeSalud: Array<any> = [];

  ngOnInit(): void {
    // Generic Error function for selects
    const error = (error: any) => {
      console.log(error);
      this.snack.open('Ocurrio un error al cargar los datos', 'Cerrar', { duration: 3000 });
    }

    // Get selects data
    this.service.getZonas(error, this.zonas );
    this.service.getLocalidades(error, this.localidades);
    this.service.getTipoGrupoMedico(error, this.tiposGrupoMedico);
    this.tiposCentroDeSalud = [
      { id: 'laboratorioClinico', nombre: "Laboratorio Clinico" },
      { id: 'grupoMedico', nombre: "Grupo Medico" },
      { id: 'clinicaPrivada', nombre: "Clinica Privada" },
      { id: 'centroOdontologico', nombre: "Centro Odontologico" },
      { id: 'centroOftalmologico', nombre: "Centro Oftalmologico" },
    ]
  }

    // Form Controls
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
      hematologiaCompleta: [''],
      perfil20: [''],
      perfilTiroideo: [''],
      urocultivo: [''],
      heces: [''],
      orina: [''],
      perfilPreoperatorio: ['']
    });

    grupoMedicoForm = this.fb.group({
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
      psiquiatria: [''],
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
      herniaInguinal: [''],
      cesarea: [''],
      partoNormal: [''],
      hospitalizacion: [''],
    });

    clinicaPrivadaForm = this.fb.group({
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
      herniorrafiaInguinal: [''],
      cesarea: [''],
      partoNormal: [''],
      hospitalizacion: [''],
    });

    centroOftalmologicoForm = this.fb.group({
      oftalmologiaGeneralDesde: [''],
      oftalmologiaGeneralHasta: [''],
      tratamientoGlaucomaCataratas: [false],
      protesisOculares: [false],
      tratamientosEspecializados: [false],
      oncologia: [false],
      otros: [false],
    });

    centroOdontologicoForm = this.fb.group({
      odontologiaGeneralDesde: ['', Validators.required],
      odontologiaGeneralHasta: [''],
      ortodoncia: [false],
      endodoncia: [false],
      cirugiaBucal: [false],
      protesis: [false],
      rayosX: [false],
    });

    // Form Submit
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
        case 'laboratorioClinico':
          this.service.addLaboratorioClinico(this.genericForm, this.laboratorioClinicoForm, config)
          break;
        case 'grupoMedico':
          this.service.addGrupoMedico(this.genericForm, this.grupoMedicoForm, config)
          break;
        case 'clinicaPrivada':
          this.service.addClinicaPrivada(this.genericForm, this.clinicaPrivadaForm, config)
          break;
        case 'centroOdontologico':
          this.service.addCentroOdontologico(this.genericForm, this.centroOdontologicoForm, config)
          break;
        case 'centroOftalmologico':
          this.service.addCentroOftalmologico(this.genericForm, this.centroOftalmologicoForm, config)
          break;
        default:
          this.snack.open('Error con el tipo de centro de salud', 'Cerrar', {
            duration: 3000,
          });
          break;
      }

    }

    // Image Upload
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

    // Delete uploaded image
    deleteFile(filename:any) {
      this.service.deleteFile(filename, (error: any) => {
        console.log(error);
        this.snack.open('Ocurrio un error al eliminar la imagen', 'Cerrar', { duration: 3000 });
      }, this.genericForm.value.imagenes!);
    }

    // Fields Reactives
    fieldsLaboratorioClinico: any = {}
    fieldsCentroOdontologico: any = {}
    fieldsCentroOftalmologico: any = {}
    fieldsGrupoMedico: any = {}
    fieldsClinicaPrivada: any = {}
    
    selectField = new FormControl(null, Validators.required);// Field Selected in Select
    inFormFields: Array<{label: string, value: string, control:FormControl}>= [] // Fields currently in form

    // Return the fields for the current type of centro de salud
    getFields() {
      switch(this.tipoCentro?.value){
        case 'laboratorioClinico':
          return this.fieldsLaboratorioClinico;
        case 'centroOdontologico':
          return this.fieldsCentroOdontologico;
        case 'centroOftalmologico':
          return this.fieldsCentroOftalmologico;
        case 'grupoMedico':
          return this.fieldsGrupoMedico;
        case 'clinicaPrivada':
          return this.fieldsClinicaPrivada;
        default:
          return {};
      }
    }
    // Return the form for the current type of centro de salud
    private getForm()
    {
      switch(this.tipoCentro?.value){
        case 'laboratorioClinico':
          return this.laboratorioClinicoForm;
        case 'centroOdontologico':
          return this.centroOdontologicoForm;
        case 'centroOftalmologico':
          return this.centroOftalmologicoForm;
        case 'grupoMedico':
          return this.grupoMedicoForm;
        case 'clinicaPrivada':
          return this.clinicaPrivadaForm;
        default:
          return this.fb.group({});
      }
    }

    // Add and Delete Fields from form
    addField() {
      const selected = this.selectField.value
      if( selected != null && selected != undefined && selected != ''){
        const value: string = this.selectField.value!;
        const fields = this.getFields();
        const label = fields[value];
        const control: {label:string, control: FormControl, value:string} = {
          label: label,
          control: this.getForm()
          .controls[selected] as FormControl,
          value: value
        };
        this.inFormFields.push(control)
        delete fields[value];
        this.selectField.reset();
      }
    }
    deleteField(i:number){
      const control = this.inFormFields[i];
      this.getFields()[control.value] = control.label;
      this.inFormFields[i].control.reset();
      this.inFormFields.splice(i, 1);
    }

    resetFields(){
      this.fieldsLaboratorioClinico = {
        hematologiaCompleta: "Hematologia Completa",
        perfil20: "Perfil 20",
        perfilTiroideo: "Perfil Tiroideo",
        urocultivo: "Urocultivo",
        heces: "Heces",
        orina: "Orina",
        perfilPreoperatorio: "Perfil Preoperatorio"
      };
      this.fieldsCentroOdontologico = {
        odontologiaGeneralDesde: "Odontologia General Desde",
        odontologiaGeneralHasta: "Odontologia General Hasta",
        ortodoncia: "Ortodoncia",
        endodoncia: "Endodoncia",
        cirugiaBucal: "Cirugia Bucal",
        protesis: "Protesis",
        rayosX: "Rayos X",
      };
      this.fieldsCentroOftalmologico = {
        oftalmologiaGeneralDesde: "Oftalmologia General Desde",
        oftalmologiaGeneralHasta: "Oftalmologia General Hasta",
        tratamientoGlaucomaCataratas: "Tratamiento Glaucoma Cataratas",
        protesisOculares: "Protesis Oculares",
        tratamientosEspecializados: "Tratamientos Especializados",
        oncologia: "Oncologia",
        otros: "Otros",
      };
      this.fieldsGrupoMedico = {
        tipoId: "Tipo de Grupo Medico",
        medicinaGeneral: "Medicina General",
        medicinaInterna: "Medicina Interna",
        pediatria: "Pediatria",
        ginecologia: "Ginecologia",
        obstetricia: "Obstetricia",
        cardiologia: "Cardiologia",
        gastro: "Gastroenterologia",
        neurologia: "Neurologia",
        neumonologia: "Neumonologia",
        medicinaFyR: "Medicina Fisica y Rehabilitacion",
        psiquiatria: "Psiquiatria",
        psicologia: "Psicologia",
        rayosXDeTorax: "Rayos X De Torax",
        tomografiaAbdominalPelvica: "Tomografia Abdominal Pelvica",
        resonanciaCerebral: "Resonancia Cerebral",
        ecoAbdominal: "Eco Abdominal",
        mamografia: "Mamografia",
        densitometriaOsea: "Densitometria Osea",
        epirometria: "Epirometria",
        eeg: "Electroencefalograma",
        lamparoscopia: "Lamparoscopia",
        pruebaDeEsfuerzoCardio: "Prueba De Esfuerzo Cardio",
        hematologiaCompleta: "Hematologia Completa",
        perfil20: "Perfil 20",
        perfilTiroideo: "Perfil Tiroideo",
        urocultivo: "Urocultivo",
        heces: "Heces",
        orina: "Orina",
        perfilPreoperatorio: "Perfil Preoperatorio",
        apendicectomia: "Apendicectomia",
        colecistectomia: "Colecistectomia",
        herniaInguinal: "Hernia Inguinal",
        cesarea: "Cesarea",
        partoNormal: "Parto Normal",
        hospitalizacion: "Hospitalizacion",
      };
      this.fieldsClinicaPrivada = {
        emergencia: "Emergencia",
        medicinaGeneral: "Medicina General",
        medicinaInterna: "Medicina Interna",
        pediatria: "Pediatria",
        ginecologia: "Ginecologia",
        obstetricia: "Obstetricia",
        cardiologia: "Cardiologia",
        rayosXDeTorax: "Rayos X De Torax",
        tomografiaAbdominalPelvica: "Tomografia Abdominal Pelvica",
        resonanciaCerebral: "Resonancia Cerebral",
        ecoAbdominal: "Eco Abdominal",
        mamografia: "Mamografia",
        densitometriaOsea: "Densitometria Osea",
        hematologiaCompleta: "Hematologia Completa",
        perfil20: "Perfil 20",
        perfilTiroideo: "Perfil Tiroideo",
        urocultivo: "Urocultivo",
        heces: "Heces",
        orina: "Orina",
        perfilPreoperatorio: "Perfil Preoperatorio",
        apendicectomia: "Apendicectomia",
        colecistectomiaLamparoscopica: "Colecistectomia Lamparoscopica",
        herniorrafiaInguinal: "Herniorrafia Ingiunal",
        cesarea: "Cesarea",
        partoNormal: "Parto Normal",
        hospitalizacion: "Hospitalizacion",
      };
      this.inFormFields = [];
      this.laboratorioClinicoForm.reset();
      this.centroOdontologicoForm.reset();
      this.centroOftalmologicoForm.reset();
      this.grupoMedicoForm.reset();
      this.clinicaPrivadaForm.reset();
      this.selectField.reset();
    }



    // Getters
    // Generic
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
