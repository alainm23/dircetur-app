import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaXxxPage } from './pagina-xxx.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaXxxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaXxxPageRoutingModule {}
