import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EspecialistaPageRoutingModule } from './especialista-routing.module';

import { EspecialistaPage } from './especialista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EspecialistaPageRoutingModule
  ],
  declarations: [EspecialistaPage]
})
export class EspecialistaPageModule {}
