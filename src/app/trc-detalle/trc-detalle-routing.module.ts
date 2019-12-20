import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrcDetallePage } from './trc-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: TrcDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrcDetallePageRoutingModule {}
