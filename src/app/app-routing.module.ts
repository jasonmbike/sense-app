import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'especialista',
    loadChildren: () => import('./pages/especialista/especialista.module').then( m => m.EspecialistaPageModule)
  },
  {
    path: 'reservas',
    loadChildren: () => import('./pages/reservas/reservas.module').then( m => m.ReservasPageModule)
  },
  {
    path: 'pagar',
    loadChildren: () => import('./pages/pagar/pagar.module').then( m => m.PagarPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },

  {
    path: 'documentacion',
    loadChildren: () => import('./pages/documentacion/documentacion.module').then( m => m.DocumentacionPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'reportar',
    loadChildren: () => import('./pages/reportar/reportar.module').then( m => m.ReportarPageModule)
  },
  {
    path: 'formulario-perfil',
    loadChildren: () => import('./pages/formulario-perfil/formulario-perfil.module').then( m => m.FormularioPerfilPageModule)
  },
  {
    path: 'agregarhorario',
    loadChildren: () => import('./pages/agregarhorario/agregarhorario.module').then( m => m.AgregarhorarioPageModule)
  },
  {
    path: 'mihorarioesp',
    loadChildren: () => import('./pages/mihorarioesp/mihorarioesp.module').then( m => m.MihorarioespPageModule)
  },
  {
    path: 'buscaresp',
    loadChildren: () => import('./pages/buscaresp/buscaresp.module').then( m => m.BuscarespPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
