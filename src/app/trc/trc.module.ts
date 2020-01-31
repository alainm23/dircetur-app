import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrcPageRoutingModule } from './trc-routing.module';

import { TrcPage } from './trc.page';

// Translate
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrcPageRoutingModule,
    TranslateModule
  ],
  declarations: [TrcPage]
})
export class TrcPageModule {}
