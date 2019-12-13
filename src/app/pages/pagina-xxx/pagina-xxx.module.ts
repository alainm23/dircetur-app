import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaXxxPageRoutingModule } from './pagina-xxx-routing.module';

import { PaginaXxxPage } from './pagina-xxx.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaXxxPageRoutingModule
  ],
  declarations: [PaginaXxxPage]
})
export class PaginaXxxPageModule {}
