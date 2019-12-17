import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportProviderPage } from './report-provider.page';

const routes: Routes = [
  {
    path: '',
    component: ReportProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportProviderPageRoutingModule {}
