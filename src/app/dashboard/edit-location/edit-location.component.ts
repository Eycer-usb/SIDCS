import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddLocationService } from '../add-location/add-location.service';
import { AddLocationComponent } from '../add-location/add-location.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-location',
  templateUrl: '../add-location/add-location.component.html',
  // templateUrl: './edit-location.component.html',
  styleUrls: ['../add-location/add-location.component.scss']
})
export class EditLocationComponent extends AddLocationComponent {
  constructor(protected override fb: FormBuilder, protected override router: Router,
    protected override snack: MatSnackBar, public override service: AddLocationService,
    public override dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    private changeDetector: ChangeDetectorRef) {
    super(fb, router, snack, service, dialog);
  }

  override title = ""
  override modal = true
  override buttonText = "Guardar"
  override endpoint = environment.apiUrl + "/centro-salud/storage?path=centrosDeSalud/";
  

  ngAfterViewInit() {
    this.genericForm.addControl('id', new FormControl(this.data.id, Validators.required))
    this.fillForm();
  }


  protected fillForm() {

    // Loading Generic Form
    this.genericForm.patchValue({
      nombre: this.data.nombre,
      zonaId: this.data.zona.id,
      localidadId: this.data.localidad.id,
      demanda: this.data.demanda,
      direccion: this.data.direccion,
      latitud: this.data.latitud,
      limpieza: this.data.limpieza,
      longitud: this.data.longitud,
      tamano: this.data.tamano,
      telefono: this.data.telefono,
    })

    this.data.imagenes.forEach((imagen: any) => {
      this.genericForm.value.imagenes.push(imagen.url)
    });

    // Loading Specific Form
    const centroId = this.tiposCentroDeSalud.find(tipo => tipo.nombre == this.data.tipoCentroSalud).id
    this.tipoCentro.patchValue(centroId)
    this.resetFields()

    // Fields to be ignored
    const genericFieldsKeys = [
      'nombre',
      'zona',
      'localidad',
      'demanda',
      'direccion',
      'imagenes',
      'latitud',
      'limpieza',
      'longitud',
      'tamano',
      'telefono',
      'updatedAt',
      'createdAt',
      'deletedAt',
      'route',
      'tipoCentroSalud',
    ]

    // Creating payload
    const payload: any = Object.fromEntries(Object.entries(this.data).filter(([key, value]) => !genericFieldsKeys.includes(key) && value != null))

    // Setting payload
    if (centroId ==  'grupoMedico' && payload['tipo']) {
      payload['tipoId'] = payload['tipo'].id
      delete payload['tipo']
    }

    // Loading Required Fields
    const form = this.getForm()
    form.patchValue(payload)
    const { id, ...rest } = payload
    const fields = this.getFields()
    for( const key in fields ){
      if(fields[key].required && rest.hasOwnProperty(key)){
        this.selectField.setValue(key);
        this.addField();
      }
    }

    // Loading Optional Fields
    for( const key in rest ){
      if(fields[key] && !fields[key].required && rest.hasOwnProperty(key)){
        this.selectField.setValue(key);
        this.addField();
      }
    }
    
  }
}
