import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddLocationComponent } from './add-location/add-location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';

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
    GoogleMapsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatDialogModule
  ]
})
export class DashboardModule { }
