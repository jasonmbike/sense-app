import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },  {
    path: 'login-registro',
    loadChildren: () => import('./modals/login-registro/login-registro.module').then( m => m.LoginRegistroPageModule)
  },
  {
    path: 'login-opciones',
    loadChildren: () => import('./modals/login-opciones/login-opciones.module').then( m => m.LoginOpcionesPageModule)
  },
  {
    path: 'login-restablecer-contrasena',
    loadChildren: () => import('./modals/login-restablecer-contrasena/login-restablecer-contrasena.module').then( m => m.LoginRestablecerContrasenaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
