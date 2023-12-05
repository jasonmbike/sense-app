import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRegistroPage } from './login-registro.page';

const routes: Routes = [
  {
    path: '',
    component: LoginRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRegistroPageRoutingModule {}
