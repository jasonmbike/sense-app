import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletaAceptadaPageRoutingModule } from './boleta-aceptada-routing.module';

import { BoletaAceptadaPage } from './boleta-aceptada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletaAceptadaPageRoutingModule
  ],
  declarations: [BoletaAceptadaPage]
})
export class BoletaAceptadaPageModule {}
