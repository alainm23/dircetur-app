import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletoTuristicoPageRoutingModule } from './boleto-turistico-routing.module';

import { BoletoTuristicoPage } from './boleto-turistico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletoTuristicoPageRoutingModule
  ],
  declarations: [BoletoTuristicoPage]
})
export class BoletoTuristicoPageModule {}
