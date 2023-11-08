import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { MapComponent } from './map/map.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ListLocationComponent } from './list-location/list-location.component';
import { EditLocationComponent } from './edit-location/edit-location.component';
import { ViewLocationComponent } from './view-location/view-location.component';

@NgModule({
  declarations: [
    NavigationComponent,
    MapComponent,
    AddLocationComponent,
    ListLocationComponent,
    EditLocationComponent,
    ViewLocationComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatDialogModule
  ]
})
export class DashboardModule { }
