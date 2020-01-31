import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TurismoCircuitoPageRoutingModule } from './turismo-circuito-routing.module';

import { TurismoCircuitoPage } from './turismo-circuito.page';

// Translate
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TurismoCircuitoPageRoutingModule,
    TranslateModule
  ],
  declarations: [TurismoCircuitoPage]
})
export class TurismoCircuitoPageModule {}
