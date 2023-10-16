import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  constructor() { }

  mapOptions: google.maps.MapOptions = {
    center: { lat: 10.4712235, lng: -66.8861625 },
    zoom: 13
  };

}
