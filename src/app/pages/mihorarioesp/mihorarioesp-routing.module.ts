import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MihorarioespPage } from './mihorarioesp.page';

const routes: Routes = [
  {
    path: '',
    component: MihorarioespPage
  },
  {
    path: 'modalhorario',
    loadChildren: () => import('./modals/modalhorario/modalhorario.module').then( m => m.ModalhorarioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MihorarioespPageRoutingModule {}
