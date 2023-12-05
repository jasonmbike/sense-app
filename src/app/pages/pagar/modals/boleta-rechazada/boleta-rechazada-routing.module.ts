import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletaRechazadaPage } from './boleta-rechazada.page';

const routes: Routes = [
  {
    path: '',
    component: BoletaRechazadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletaRechazadaPageRoutingModule {}
