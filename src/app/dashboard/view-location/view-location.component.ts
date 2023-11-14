import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapComponent } from '../map/map.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss']
})
export class ViewLocationComponent {

  constructor(
    public dialogRef: MatDialogRef<MapComponent>,
    protected snack: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngAfterViewInit() {
    const { nombre, createdAt, updatedAt, deletedAt,
      demanda, direccion, id, imagenes, latitud, longitud, telefono,
      limpieza, localidad, route, tamano, tipoCentroSalud, zona,
      ... rest } = this.data;

    for (const key in rest) {
      if (rest.hasOwnProperty(key)) {
        const element = rest[key];
        let label = key.replace(/([A-Z])/g, ' $1').trim();
        label = label.charAt(0).toUpperCase() + label.slice(1);
        if (element !== null  && typeof element !== 'boolean' && element !== "" && key !== "tipo") {
          this.specificData.push({label: label, value: element});
        }
        else if (key == 'tipo') {
          this.specificData.push({label: 'Tipo de Grupo Medico', value: element.descripcion});
        }
        else if( key == 'medicinaFyR') {
          this.specificData.push({label: 'Medicina FyR', value: element ? 'Si' : 'No'});
        }
        else if( typeof element === 'boolean') {
          this.specificData.push({label: label, value: element ? 'Si' : 'No'});
        }
      }
    }
    console.log(this.specificData);
  }

  endpoint = environment.apiUrl + "/centro-salud/storage?filename=";
  specificData: any = [];  

}
