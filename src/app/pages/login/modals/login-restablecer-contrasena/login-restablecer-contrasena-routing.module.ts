import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRestablecerContrasenaPage } from './login-restablecer-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: LoginRestablecerContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRestablecerContrasenaPageRoutingModule {}
