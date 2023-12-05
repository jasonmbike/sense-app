import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { IonicModule } from '@ionic/angular';

import { LoginRestablecerContrasenaPageRoutingModule } from './login-restablecer-contrasena-routing.module';

import { LoginRestablecerContrasenaPage } from './login-restablecer-contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRestablecerContrasenaPageRoutingModule
    
  ],
  declarations: [LoginRestablecerContrasenaPage],
})
export class LoginRestablecerContrasenaPageModule {}
