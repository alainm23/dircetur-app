import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlogArticuloPageRoutingModule } from './blog-articulo-routing.module';

import { BlogArticuloPage } from './blog-articulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlogArticuloPageRoutingModule
  ],
  declarations: [BlogArticuloPage]
})
export class BlogArticuloPageModule {}
