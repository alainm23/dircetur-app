import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrcDetallePageRoutingModule } from './trc-detalle-routing.module';

import { TrcDetallePage } from './trc-detalle.page';

// Translate
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrcDetallePageRoutingModule,
    TranslateModule
  ],
  declarations: [TrcDetallePage]
})
export class TrcDetallePageModule {}
