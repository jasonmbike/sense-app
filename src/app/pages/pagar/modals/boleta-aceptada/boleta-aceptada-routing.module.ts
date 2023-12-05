import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletaAceptadaPage } from './boleta-aceptada.page';

const routes: Routes = [
  {
    path: '',
    component: BoletaAceptadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletaAceptadaPageRoutingModule {}
