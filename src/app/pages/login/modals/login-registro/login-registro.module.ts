import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginRegistroPageRoutingModule } from './login-registro-routing.module';

import { LoginRegistroPage } from './login-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRegistroPageRoutingModule
  ],
  declarations: [LoginRegistroPage]
})
export class LoginRegistroPageModule {}
