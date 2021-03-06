import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlogArticuloPageRoutingModule } from './blog-articulo-routing.module';

import { BlogArticuloPage } from './blog-articulo.page';

// Translate
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlogArticuloPageRoutingModule,
    TranslateModule
  ],
  declarations: [BlogArticuloPage]
})
export class BlogArticuloPageModule {}
