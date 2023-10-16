import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddLocationComponent } from './add-location/add-location.component';

@NgModule({
  declarations: [
    NavigationComponent,
    MapComponent,
    AddLocationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    GoogleMapsModule
  ]
})
export class DashboardModule { }
