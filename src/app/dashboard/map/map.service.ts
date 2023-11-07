import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map, Marker } from 'leaflet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  endpoint = environment.apiUrl + '/centro-salud'

  constructor( private http: HttpClient ) { }

  // Import the Leaflet library asynchronously
  async getMap(): Promise<any> {
    const L = await import('leaflet');
    return L;
  }

  // Initialize the map
  async initMap( map: { map: Map | undefined, htmlId: string, center: Array<number>, zoom: number } ): Promise<void>{
    const L = await this.getMap();
    map.map = L.map(map.htmlId, 
    {
      center: map.center,
      zoom: map.zoom
    });

    const tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

    tiles.addTo(map.map);
  }

  // Search in server for locations and add them to the map
  // next: Function to execute when the request is successful
  // error: Function to execute when the request fails
  // complete: Function to execute when the request is complete
  queryLocations( next: Function, error: Function, complete: Function ): void {
    const response = this.http.get(this.endpoint).subscribe({
      next: (data: any) => {
        next(data);
      },
      error: (err: any) => {
        error(err);
      },
      complete: () => {
        complete();
      }
    });
  }

  // Add a locations to the map
  addLocationsToMap( map: any, locations: Array<any> ) {
    locations.forEach( async (location) => {
      await this.createMarker( location.meta, map );
    });
  }

  // Create a marker with the location data
  async createMarker( location: any, map: any ): Promise<void> {
    console.log("Creating marker ", [location.latitud, location.longitud])
    const L = await this.getMap();
    const marker = L.marker([location.latitud, location.longitud]);
    marker.bindPopup(`<b>${location.nombre}</b><br>${location.direccion}`);
    marker.addTo(map.map);
  }

  resetMap( map: any ): void {
    map.map?.eachLayer((layer: any) => {
      if(!layer._url)
        map.map?.removeLayer(layer);
    });
  }

  // Fill Map with polygons
  async drawPolygons( map: any ): Promise<void> {
    this.http.get('/assets/polygons.json').subscribe({
      next: async (data: any) => {
        console.log("Drawing polygons")
        for(const key in data) {
          const polygon = data[key];
          const L = await this.getMap();
          const poly = L.polygon(polygon, { color: '#' + map.styles[key].color });
          poly.addTo(map.map);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('Complete');
      }
    });
  }

}
