import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarhorarioPageRoutingModule } from './agregarhorario-routing.module';

import { AgregarhorarioPage } from './agregarhorario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarhorarioPageRoutingModule
  ],
  declarations: [AgregarhorarioPage]
})
export class AgregarhorarioPageModule {}
