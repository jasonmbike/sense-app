import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregaryeditarPage } from './agregaryeditar.page';

const routes: Routes = [
  {
    path: '',
    component: AgregaryeditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregaryeditarPageRoutingModule {}
