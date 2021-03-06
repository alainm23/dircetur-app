import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'calendario',
    loadChildren: () => import('./calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'boleto-turistico',
    loadChildren: () => import('./boleto-turistico/boleto-turistico.module').then( m => m.BoletoTuristicoPageModule)
  },
  {
    path: 'search-results',
    loadChildren: () => import('./search-results/search-results.module').then( m => m.SearchResultsPageModule)
  },
  {
    path: 'report-provider',
    loadChildren: () => import('./report-provider/report-provider.module').then( m => m.ReportProviderPageModule)
  },
  {
    path: 'event-detail/:id',
    loadChildren: () => import('./event-detail/event-detail.module').then( m => m.EventDetailPageModule)
  },
  {
    path: 'blog-articulo/:id',
    loadChildren: () => import('./blog-articulo/blog-articulo.module').then( m => m.BlogArticuloPageModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then( m => m.BlogPageModule)
  },
  {
    path: 'turismo-circuito',
    loadChildren: () => import('./turismo-circuito/turismo-circuito.module').then( m => m.TurismoCircuitoPageModule)
  },
  {
    path: 'trc',
    loadChildren: () => import('./trc/trc.module').then( m => m.TrcPageModule)
  },
  {
    path: 'circuito-detalle/:id',
    loadChildren: () => import('./circuito-detalle/circuito-detalle.module').then( m => m.CircuitoDetallePageModule)
  },
  {
    path: 'trc-detalle/:id',
    loadChildren: () => import('./trc-detalle/trc-detalle.module').then( m => m.TrcDetallePageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'creditos',
    loadChildren: () => import('./creditos/creditos.module').then( m => m.CreditosPageModule)
  },
  {
    path: 'energency-direct',
    loadChildren: () => import('./energency-direct/energency-direct.module').then( m => m.EnergencyDirectPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }