import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentacionPageRoutingModule } from './documentacion-routing.module';

import { DocumentacionPage } from './documentacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentacionPageRoutingModule
  ],
  declarations: [DocumentacionPage]
})
export class DocumentacionPageModule {}
