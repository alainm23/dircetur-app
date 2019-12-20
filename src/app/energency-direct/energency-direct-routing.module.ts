import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnergencyDirectPage } from './energency-direct.page';

const routes: Routes = [
  {
    path: '',
    component: EnergencyDirectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnergencyDirectPageRoutingModule {}
