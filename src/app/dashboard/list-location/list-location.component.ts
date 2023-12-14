import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AddLocationService } from '../add-location/add-location.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ListLocationService } from './list-location.service';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { EditLocationComponent } from '../edit-location/edit-location.component';

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.scss']
})
export class ListLocationComponent implements OnInit {
  constructor(protected fb: FormBuilder, protected router: Router,
    protected snack: MatSnackBar, protected addLocationService: AddLocationService,
    public dialog: MatDialog, protected service: ListLocationService) {}

  title = "Lista de Registros"

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


    this.tiposCentroDeSalud = [
      { id: 'laboratorioClinico', nombre: "Laboratorios Clínicos" },
      { id: 'grupoMedico', nombre: "Grupos Médicos y U. Especializadas" },
      { id: 'clinicaPrivada', nombre: "Clínicas Privadas" },
      { id: 'centroOdontologico', nombre: "Centros Odontológicos" },
      { id: 'centroOftalmologico', nombre: "Centros Oftalmológicos" },
    ]

    // Get selects data
    this.service.getZonas().subscribe({
      next: (data: any) => {
        this.zonas = data.map((row: any) => {
          return {
            id: row.id,
            nombre: `${row.id} - ${row.descripcion}`
          }
        })
      },
      error: error,
      complete: () => {
        this.fillSelects('zonaId', this.zonas);
        this.refreshLocalidades();
      }
    })

    this.fillSelects('tipoCentroSaludId', this.tiposCentroDeSalud);

  }

  
  fillSelects( attr: string, array: any ): void {
    this.form.setValue({ ...this.form.value, [attr]: array.map( (e:any) => e.id ) } as any)
  }

  form = this.fb.group({
    zonaId: new FormControl(),
    localidadId: new FormControl(),
    tipoCentroSaludId: new FormControl(),
  });

  list: Array<row> = []
  displayedColumns = ['nombre', 'tipo', 'zonaId', 'localidad', 'actions'];

  search() {
    this.service.getData( this.form.value ).subscribe(
      {
        next: (data: Array<any>) => {
          this.list = data.map((row: any) => {
            if(row)
            return {
              nombre: row.nombre,
              tipo: row.tipoCentroSalud,
              zonaId: `${row.zona.id} - ${row.zona.descripcion}`,
              localidad: row.localidad.descripcion,
              meta: row
            }
            return {
              nombre: '',
              tipo: '',
              zonaId: 0,
              localidad: '',
              meta: {}
            }
          })
        },
        error: (error: any) => {
          console.log(error);
          this.snack.open('Ocurrio un error al obtener los datos desde el servidor', 'Cerrar', { duration: 3000 });
        }
      }
    )
  }

  refreshLocalidades() {
    this.service.getLocalidades(this.form.value.zonaId).subscribe({
      next: (data: any) => {
        this.localidades = data.map((row: any) => {
          return {
            id: row.id,
            nombre: `${row.id} - ${row.descripcion}`
          }
        })
      },
      error: (error: any) => {
        console.log(error);
        this.snack.open('Ocurrio un error al cargar los datos', 'Cerrar', { duration: 3000 });
      },
      complete: () => {
        this.fillSelects('localidadId', this.localidades);
      }
    })
  }

  confirmDelete(data: any) {
    this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: { title: "¿Desea Continuar?", body: "Se eliminara el centro de salud seleccionado" }
    }).afterClosed().subscribe(result => {
      if(result) {
        console.log(data);
        this.delete(data);
      }
    });
  }

  delete(element: any) {
    this.service.delete(element).subscribe({
      complete: () => {
        this.snack.open('Centro de salud eliminado correctamente', 'Cerrar', { duration: 3000 });
        this.search();
      },
      error: (error: any) => {
        console.log(error);
        this.snack.open('Ocurrio un error al eliminar el centro de salud', 'Cerrar', { duration: 3000 });
      }});
  }
  edit(element: any) {
    this.dialog.open( EditLocationComponent, {
      data: element.meta,
      width: '70%',
      height: '80%'
      
    }).afterClosed().subscribe(result => {
      if(result) {
        this.search();
      }
    });
  }
  

  get zonaId() {
    return this.form.get(['zonaId'])
  }
  get localidadId() {
    return this.form.get(['localidadId'])
  }
  get tipoGrupoMedicoId() {
    return this.form.get(['tipoGrupoMedicoId'])
  }
  get tipoCentroSaludId() {
    return this.form.get(['tipoCentroSaludId'])
  }



}


export interface row {
  nombre: string,
  tipo: string,
  zonaId: any,
  localidad: string
  meta: any
}