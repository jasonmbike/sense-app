import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregaryeditarPageRoutingModule } from './agregaryeditar-routing.module';

import { AgregaryeditarPage } from './agregaryeditar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregaryeditarPageRoutingModule
  ],
  declarations: [AgregaryeditarPage]
})
export class AgregaryeditarPageModule {}
