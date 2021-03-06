import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { SlugifyPipe } from './pipes/slugify.pipe';

// Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// Storage
import { IonicStorageModule } from '@ionic/storage';

// API REST
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modal Pages
import { SearchResultsPageModule } from './search-results/search-results.module';
import { ReportProviderPageModule } from './report-provider/report-provider.module';

declare var require: any;

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, SlugifyPipe],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot (), 
    AppRoutingModule,
    AngularFireModule.initializeApp (environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot (),
    HttpClientModule,

    // Modals
    SearchResultsPageModule,
    ReportProviderPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
