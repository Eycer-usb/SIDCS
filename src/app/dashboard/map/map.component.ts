import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent  implements AfterViewInit{

  public map = {
    map: undefined,
    htmlId: 'map',
    center: [ 10.4712235, -66.8861625 ],
    zoom: 13
  };

  constructor( private mapService: MapService) { }
  async ngAfterViewInit() {
    console.log(this.map.map)
    await this.mapService.initMap( this.map );
    await this.mapService.fillMap(this.map);
  }

}
