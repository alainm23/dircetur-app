import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CircuitoDetallePage } from './circuito-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: CircuitoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CircuitoDetallePageRoutingModule {}
