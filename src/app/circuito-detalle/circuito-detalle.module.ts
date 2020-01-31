import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CircuitoDetallePageRoutingModule } from './circuito-detalle-routing.module';

import { CircuitoDetallePage } from './circuito-detalle.page';

// Translate
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CircuitoDetallePageRoutingModule,
    TranslateModule
  ],
  declarations: [CircuitoDetallePage]
})
export class CircuitoDetallePageModule {}
