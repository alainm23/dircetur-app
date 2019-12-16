import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletoTuristicoPage } from './boleto-turistico.page';

const routes: Routes = [
  {
    path: '',
    component: BoletoTuristicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletoTuristicoPageRoutingModule {}
