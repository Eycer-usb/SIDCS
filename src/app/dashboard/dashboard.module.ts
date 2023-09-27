import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    NavigationComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class DashboardModule { }
