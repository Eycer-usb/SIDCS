import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { SecurePipe } from './pipes/secure.pipe';
import { ConfirmComponent } from './confirm/confirm.component';
import { MaterialModule } from '../material/material.module';
import { CarouselComponent } from './carousel/carousel.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    FileuploadComponent,
    SecurePipe,
    ConfirmComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [
    PageNotFoundComponent,
    FileuploadComponent,
    SecurePipe,
    CarouselComponent
  ]
})
export class SharedModule { }
