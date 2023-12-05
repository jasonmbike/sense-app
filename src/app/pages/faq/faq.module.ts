import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaqPageRoutingModule } from './faq-routing.module';

import { FaqPage } from './faq.page';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaqPageRoutingModule
  ],
  declarations: [FaqPage, SafeHtmlPipe]
})
export class FaqPageModule {}
