import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { SecurePipe } from './pipes/secure.pipe';
import { ConfirmComponent } from './confirm/confirm.component';
import { MaterialModule } from '../material/material.module';
import { CarouselComponent } from './carousel/carousel.component';
import { ViewFieldComponent } from './view-field/view-field.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    FileuploadComponent,
    SecurePipe,
    ConfirmComponent,
    CarouselComponent,
    ViewFieldComponent
  ],
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [
    PageNotFoundComponent,
    FileuploadComponent,
    SecurePipe,
    CarouselComponent,
    ViewFieldComponent
  ]
})
export class SharedModule { }
