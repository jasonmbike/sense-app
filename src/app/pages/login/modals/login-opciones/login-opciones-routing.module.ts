import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginOpcionesPage } from './login-opciones.page';

const routes: Routes = [
  {
    path: '',
    component: LoginOpcionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginOpcionesPageRoutingModule {}
