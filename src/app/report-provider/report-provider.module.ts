import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportProviderPageRoutingModule } from './report-provider-routing.module';

import { ReportProviderPage } from './report-provider.page';

// Translate
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReportProviderPageRoutingModule,
    TranslateModule
  ],
  declarations: [ReportProviderPage]
})
export class ReportProviderPageModule {}
