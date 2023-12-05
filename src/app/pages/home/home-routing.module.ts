import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { FaqPage } from '../faq/faq.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'faq',
    component: FaqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
