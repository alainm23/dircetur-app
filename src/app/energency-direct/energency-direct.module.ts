import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnergencyDirectPageRoutingModule } from './energency-direct-routing.module';

import { EnergencyDirectPage } from './energency-direct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnergencyDirectPageRoutingModule
  ],
  declarations: [EnergencyDirectPage]
})
export class EnergencyDirectPageModule {}
