import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalhorarioPageRoutingModule } from './modalhorario-routing.module';

import { ModalhorarioPage } from './modalhorario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalhorarioPageRoutingModule
  ],
  declarations: [ModalhorarioPage]
})
export class ModalhorarioPageModule {}
