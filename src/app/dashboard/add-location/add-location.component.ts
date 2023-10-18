import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddLocationService } from './add-location.service';
import { Observer, } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';


@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router,
    private snack: MatSnackBar, private service: AddLocationService,
    public dialog: MatDialog) {}

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
      imagenes: this.fb.array([]),
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
      oftalmologiaGeneralDesde: ['', Validators.required],
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
    
    selectField = new FormControl<string | null>(null);// Field Selected in Select
    inFormFields: Array<{label: string, value: string, control:FormControl, type:string, options:any, required?: boolean}>= [] // Fields currently in form

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
    private getForm(): FormGroup
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
        const label = fields[value].label;
        const type = fields[value].type;
        const options = fields[value].options;
        const required = fields[value].required;
        const formControl = this.getForm().controls[selected] as FormControl;
        const control: {label:string, control: FormControl, value:string, type:string, options:any, required?: boolean} = {
          label: label,
          control: formControl,
          value: value,
          type: type,
          options: options,
          required: required
        };
        this.inFormFields.push(control)
        delete fields[value];
        this.selectField.reset();
      }
    }
    deleteField(i:number){
      const control: {label:string, control: FormControl, value:string, type:string, options:any} = this.inFormFields[i];
      this.getFields()[control.value] = control;
      this.inFormFields[i].control.reset();
      this.inFormFields.splice(i, 1);
    }

    resetFields(){
      this.fieldsLaboratorioClinico = {
        hematologiaCompleta: {label: "Hematologia Completa", type: 'number', options: null},
        perfil20: { label: "Perfil 20", type:'number', options: null },
        perfilTiroideo: { label: "Perfil Tiroideo", type:'number', options: null },
        urocultivo: { label: "Urocultivo", type:'number', options: null },
        heces: { label: "Heces", type:'number', options: null },
        orina: { label: "Orina", type:'number', options: null },
        perfilPreoperatorio: { label: "Perfil Preoperatorio", type:'number', options: null }
      };
      this.fieldsCentroOdontologico = {
        odontologiaGeneralDesde: { label: "Odontologia General Desde", type: 'number', options:null, required: true},
        odontologiaGeneralHasta: { label: "Odontologia General Hasta", type: 'number', options:null},
        ortodoncia: { label: "Ortodoncia", type: 'boolean', options:null},
        endodoncia: { label: "Endodoncia", type: 'boolean', options:null},
        cirugiaBucal: { label: "Cirugia Bucal", type: 'boolean', options:null},
        protesis: { label: "Protesis", type: 'boolean', options:null},
        rayosX: { label: "Rayos X", type: 'boolean', options:null},
      };
      this.fieldsCentroOftalmologico = {
        oftalmologiaGeneralDesde: { label: "Oftalmologia General Desde", type: 'number', options: null, required: true},
        oftalmologiaGeneralHasta: { label: "Oftalmologia General Hasta", type: 'number', options: null},
        tratamientoGlaucomaCataratas: { label: "Tratamiento Glaucoma Cataratas", type: 'boolean', options: null},
        protesisOculares: { label: "Protesis Oculares", type: 'boolean', options: null},
        tratamientosEspecializados: { label: "Tratamientos Especializados", type: 'boolean', options: null},
        oncologia: { label: "Oncologia", type: 'boolean', options: null},
        otros: { label: "Otros", type: 'boolean', options: null},
      };
      this.fieldsGrupoMedico = {
        tipoId: { label: "Tipo de Grupo Medico", type: 'select', options: this.tiposGrupoMedico, required: true},
        medicinaGeneral: { label: "Medicina General", type:'number', options: null},
        medicinaInterna: { label: "Medicina Interna", type:'number', options: null},
        pediatria: { label: "Pediatria", type:'number', options: null},
        ginecologia: { label: "Ginecologia", type:'number', options: null},
        obstetricia: { label: "Obstetricia", type:'number', options: null},
        cardiologia: { label: "Cardiologia", type:'number', options: null},
        gastro: { label: "Gastroenterologia", type:'number', options: null},
        neurologia: { label: "Neurologia", type:'number', options: null},
        neumonologia: { label: "Neumonologia", type:'number', options: null},
        medicinaFyR: { label: "Medicina Fisica y Rehabilitacion", type:'number', options: null},
        psiquiatria: { label: "Psiquiatria", type:'number', options: null},
        psicologia: { label: "Psicologia", type:'number', options: null},
        rayosXDeTorax: { label: "Rayos X De Torax", type:'number', options: null},
        tomografiaAbdominalPelvica: { label: "Tomografia Abdominal Pelvica", type:'number', options: null},
        resonanciaCerebral: { label: "Resonancia Cerebral", type:'number', options: null},
        ecoAbdominal: { label: "Eco Abdominal", type:'number', options: null},
        mamografia: { label: "Mamografia", type:'number', options: null},
        densitometriaOsea: { label: "Densitometria Osea", type:'number', options: null},
        epirometria: { label: "Epirometria", type:'number', options: null},
        eeg: { label: "Electroencefalograma", type:'number', options: null},
        lamparoscopia: { label: "Lamparoscopia", type:'number', options: null},
        pruebaDeEsfuerzoCardio: { label: "Prueba De Esfuerzo Cardio", type:'number', options: null},
        hematologiaCompleta: { label: "Hematologia Completa", type:'number', options: null},
        perfil20: { label: "Perfil 20", type:'number', options: null},
        perfilTiroideo: { label: "Perfil Tiroideo", type:'number', options: null},
        urocultivo: { label: "Urocultivo", type:'number', options: null},
        heces: { label: "Heces", type:'number', options: null},
        orina: { label: "Orina", type:'number', options: null},
        perfilPreoperatorio: { label: "Perfil Preoperatorio", type:'number', options: null},
        apendicectomia: { label: "Apendicectomia", type:'number', options: null},
        colecistectomia: { label: "Colecistectomia", type:'number', options: null},
        herniaInguinal: { label: "Hernia Inguinal", type:'number', options: null},
        cesarea: { label: "Cesarea", type:'number', options: null},
        partoNormal: { label: "Parto Normal", type:'number', options: null},
        hospitalizacion: { label: "Hospitalizacion", type:'number', options: null},
      };
      this.fieldsClinicaPrivada = {
        emergencia: { label: "Emergencia", type:'number', options: null},
        medicinaGeneral: { label: "Medicina General", type:'number', options: null},
        medicinaInterna: { label: "Medicina Interna", type:'number', options: null},
        pediatria: { label: "Pediatria", type:'number', options: null},
        ginecologia: { label: "Ginecologia", type:'number', options: null},
        obstetricia: { label: "Obstetricia", type:'number', options: null},
        cardiologia: { label: "Cardiologia", type:'number', options: null},
        rayosXDeTorax: { label: "Rayos X De Torax", type:'number', options: null},
        tomografiaAbdominalPelvica: { label: "Tomografia Abdominal Pelvica", type:'number', options: null},
        resonanciaCerebral: { label: "Resonancia Cerebral", type:'number', options: null},
        ecoAbdominal: { label: "Eco Abdominal", type:'number', options: null},
        mamografia: { label: "Mamografia", type:'number', options: null},
        densitometriaOsea: { label: "Densitometria Osea", type:'number', options: null},
        hematologiaCompleta: { label: "Hematologia Completa", type:'number', options: null},
        perfil20: { label: "Perfil 20", type:'number', options: null},
        perfilTiroideo: { label: "Perfil Tiroideo", type:'number', options: null},
        urocultivo: { label: "Urocultivo", type:'number', options: null},
        heces: { label: "Heces", type:'number', options: null},
        orina: { label: "Orina", type:'number', options: null},
        perfilPreoperatorio: { label: "Perfil Preoperatorio", type:'number', options: null},
        apendicectomia: { label: "Apendicectomia", type:'number', options: null},
        colecistectomiaLamparoscopica: { label: "Colecistectomia Lamparoscopica", type:'number', options: null},
        herniorrafiaInguinal: { label: "Herniorrafia Ingiunal", type:'number', options: null},
        cesarea: { label: "Cesarea", type:'number', options: null},
        partoNormal: { label: "Parto Normal", type:'number', options: null},
        hospitalizacion: { label: "Hospitalizacion", type:'number', options: null},
      };
      this.inFormFields = [];
      this.laboratorioClinicoForm.reset();
      this.centroOdontologicoForm.reset();
      this.centroOftalmologicoForm.reset();
      this.grupoMedicoForm.reset();
      this.clinicaPrivadaForm.reset();
      this.selectField.reset();
    }

    loadRequiredFields(){
      const fields = this.getFields()
      for( const key in fields ){
        if(fields[key].required){
          this.selectField.setValue(key);
          this.addField();
        }
      }
    }

    getLabel(control: any){
      return control.label;
    }

    // Open confirm Dialog
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(ConfirmComponent, {
        width: '350px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { title: "¿Desea Continuar?", body: "Se agregara un nuevo centro de salud" }
      }).afterClosed().subscribe(result => {
        if(result) {
          this.submit();
        }
      });
    }

    isValidSubmit() {
      if (this.tipoCentro.valid) {
        const form = this.getForm();
        return form.valid && this.genericForm.valid;
      }
      return false
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
