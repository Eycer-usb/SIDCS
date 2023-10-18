import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { SecurePipe } from './pipes/secure.pipe';
import { ConfirmComponent } from './confirm/confirm.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    FileuploadComponent,
    SecurePipe,
    ConfirmComponent
  ],
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [
    PageNotFoundComponent,
    FileuploadComponent,
    SecurePipe
  ]
})
export class SharedModule { }
