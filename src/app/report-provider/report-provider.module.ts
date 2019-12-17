import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportProviderPageRoutingModule } from './report-provider-routing.module';

import { ReportProviderPage } from './report-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReportProviderPageRoutingModule
  ],
  declarations: [ReportProviderPage]
})
export class ReportProviderPageModule {}
