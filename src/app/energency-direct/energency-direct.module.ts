import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnergencyDirectPageRoutingModule } from './energency-direct-routing.module';

import { EnergencyDirectPage } from './energency-direct.page';

// Translate
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnergencyDirectPageRoutingModule,
    TranslateModule
  ],
  declarations: [EnergencyDirectPage]
})
export class EnergencyDirectPageModule {}
