import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarespPageRoutingModule } from './buscaresp-routing.module';

import { BuscarespPage } from './buscaresp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarespPageRoutingModule
  ],
  declarations: [BuscarespPage]
})
export class BuscarespPageModule {}
