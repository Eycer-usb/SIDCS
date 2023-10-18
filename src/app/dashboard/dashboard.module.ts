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
import { ViewLocationComponent } from './view-location/view-location.component';
import { EditLocationComponent } from './edit-location/edit-location.component';

@NgModule({
  declarations: [
    NavigationComponent,
    MapComponent,
    AddLocationComponent,
    ViewLocationComponent,
    EditLocationComponent
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
