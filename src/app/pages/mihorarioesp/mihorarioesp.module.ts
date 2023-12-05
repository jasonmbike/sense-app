import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MihorarioespPageRoutingModule } from './mihorarioesp-routing.module';

import { MihorarioespPage } from './mihorarioesp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MihorarioespPageRoutingModule
  ],
  declarations: [MihorarioespPage]
})
export class MihorarioespPageModule {}
