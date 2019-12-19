import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurismoCircuitoPage } from './turismo-circuito.page';

const routes: Routes = [
  {
    path: '',
    component: TurismoCircuitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TurismoCircuitoPageRoutingModule {}
