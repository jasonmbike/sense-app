import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalhorarioPage } from './modalhorario.page';

const routes: Routes = [
  {
    path: '',
    component: ModalhorarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalhorarioPageRoutingModule {}
