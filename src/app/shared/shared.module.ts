import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { SecurePipe } from './pipes/secure.pipe';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    FileuploadComponent,
    SecurePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageNotFoundComponent,
    FileuploadComponent,
    SecurePipe
  ]
})
export class SharedModule { }
