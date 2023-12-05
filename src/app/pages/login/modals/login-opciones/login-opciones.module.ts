import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginOpcionesPageRoutingModule } from './login-opciones-routing.module';

import { LoginOpcionesPage } from './login-opciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginOpcionesPageRoutingModule
  ],
  declarations: [LoginOpcionesPage]
})
export class LoginOpcionesPageModule {}
