import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrcPage } from './trc.page';

const routes: Routes = [
  {
    path: '',
    component: TrcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrcPageRoutingModule {}
