import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';

const MaterialComponents = [
  MatSlideToggleModule,
  MatSidenavModule
]

@NgModule({
  exports: [
    MaterialComponents,
    MatSidenavModule
  ]

})
export class MaterialModule { }
