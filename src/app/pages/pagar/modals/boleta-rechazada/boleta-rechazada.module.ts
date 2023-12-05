import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletaRechazadaPageRoutingModule } from './boleta-rechazada-routing.module';

import { BoletaRechazadaPage } from './boleta-rechazada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletaRechazadaPageRoutingModule
  ],
  declarations: [BoletaRechazadaPage]
})
export class BoletaRechazadaPageModule {}
