import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagarPage } from './pagar.page';

const routes: Routes = [
  {
    path: '',
    component: PagarPage
  },
  {
    path: 'boleta-aceptada',
    loadChildren: () => import('./modals/boleta-aceptada/boleta-aceptada.module').then( m => m.BoletaAceptadaPageModule)
  },
  {
    path: 'boleta-rechazada',
    loadChildren: () => import('./modals/boleta-rechazada/boleta-rechazada.module').then( m => m.BoletaRechazadaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagarPageRoutingModule {}
