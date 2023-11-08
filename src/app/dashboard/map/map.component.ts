import { AfterViewInit, Component } from '@angular/core';
import { MapService } from './map.service';
import { ListLocationComponent } from '../list-location/list-location.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddLocationService } from '../add-location/add-location.service';
import { MatDialog } from '@angular/material/dialog';
import { ListLocationService } from '../list-location/list-location.service';
import { EditLocationComponent } from '../edit-location/edit-location.component';
import { ViewLocationComponent } from '../view-location/view-location.component';
import { Map } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent extends ListLocationComponent implements AfterViewInit{

  public map = {
    map: undefined,
    htmlId: 'map',
    center: [ 10.4712235, -66.8962635 ],
    zoom: 13,
    styles: {
      zona_1: {color: 'FFDA42'},
      zona_2: {color: '42ACFF'},
      zona_3: {color: 'FF5733'},
      zona_4: {color: 'C042FF'},
      zona_5: {color: 'C62424'},
    }
  };

  openMenu = false;
  

  constructor( protected mapService: MapService,
    protected override fb: FormBuilder, protected override router: Router,
    protected override snack: MatSnackBar, protected override addLocationService: AddLocationService,
    public override dialog: MatDialog, protected override service: ListLocationService ) {
    super( fb, router, snack, addLocationService, dialog, service );
   }

  async ngAfterViewInit() {
    await this.mapService.initMap( this.map );
    await this.mapService.drawPolygons( this.map )
    this.search()
  }

  // Hide or show the menu
  clickMenu() {this.openMenu = !this.openMenu; }

  centerMap() {
    if(this.map.map){
      (this.map.map as Map).setView( [this.map.center[0], this.map.center[1]], this.map.zoom );
    }
    this.clickMenu();
   }

  // Search in server for locations and add them to the map
  override search(): void {
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
          this.mapService.resetMap( this.map );
          this.mapService.addLocationsToMap( this.map, this.list, this.onClickMarker, { component: this } );
          this.mapService.drawPolygons( this.map );

        },
        error: (error: any) => {
          console.log(error);
          this.snack.open('Ocurrio un error al obtener los datos desde el servidor', 'Cerrar', { duration: 3000 });
        }
      }
    )
    this.openMenu = false;  
  }

  // Event Triggered when a marker is clicked
  onClickMarker( location: any, options: any ): void {
    console.log(location);
    options.component.dialog.open( ViewLocationComponent, {
      data: location,
      width: '70%',
      height: '80%'
    })
  }
}
