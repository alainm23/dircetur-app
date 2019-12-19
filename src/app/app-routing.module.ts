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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
