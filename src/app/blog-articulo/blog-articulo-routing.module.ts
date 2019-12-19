import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogArticuloPage } from './blog-articulo.page';

const routes: Routes = [
  {
    path: '',
    component: BlogArticuloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogArticuloPageRoutingModule {}
