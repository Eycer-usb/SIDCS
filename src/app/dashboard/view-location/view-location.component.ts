import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AddLocationService } from '../add-location/add-location.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ViewLocationService } from './view-location.service';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss']
})
export class ViewLocationComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router,
    private snack: MatSnackBar, private addLocationService: AddLocationService,
    public dialog: MatDialog, private service: ViewLocationService) {}

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

    // Get selects data
    this.addLocationService.getZonas(error, this.zonas );
    this.addLocationService.getLocalidades(error, this.localidades);
    this.addLocationService.getTipoGrupoMedico(error, this.tiposGrupoMedico);
    this.tiposCentroDeSalud = [
      { id: 'laboratorioClinico', nombre: "Laboratorio Clinico" },
      { id: 'grupoMedico', nombre: "Grupo Medico" },
      { id: 'clinicaPrivada', nombre: "Clinica Privada" },
      { id: 'centroOdontologico', nombre: "Centro Odontologico" },
      { id: 'centroOftalmologico', nombre: "Centro Oftalmologico" },
    ]
    this.form.reset();
  }

  form = this.fb.group({
    zonaId: [''],
    localidadId: [''],
    tipoGrupoMedicoId: [''],
    tipoCentroSaludId: [''],
  });

  list: Array<row> = []
  displayedColumns = ['nombre', 'tipo', 'zonaId', 'localidad', 'actions'];

  search() {
    let zonaId: number | undefined = +this.form.get(['zonaId'])?.value;
    let localidadId: number | undefined = +this.form.get(['localidadId'])?.value;
    let tipoGrupoMedicoId: number | undefined = +this.form.get(['tipoGrupoMedicoId'])?.value;
    let tipoCentroSaludId: string | undefined = this.form.get(['tipoCentroSaludId'])?.value;

    this.service.getData(zonaId, localidadId, tipoCentroSaludId, tipoGrupoMedicoId).subscribe(
      {
        next: (data: Array<any>) => {
          this.list = data.map((row: any) => {
            if(row)
            return {
              nombre: row.nombre,
              tipo: row.tipoCentroSalud,
              zonaId: `${row.zona.id} - ${row.zona.descripcion}`,
              localidad: row.localidad.descripcion
            }
            return {
              nombre: '',
              tipo: '',
              zonaId: 0,
              localidad: ''
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

  delete(element: any) {console.log(element)}
  edit(element: any) {console.log(element)}

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
}