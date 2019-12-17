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

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modal Pages
import { SearchResultsPageModule } from './search-results/search-results.module';
import { ReportProviderPageModule } from './report-provider/report-provider.module';

declare var require: any;

@NgModule({
  declarations: [AppComponent, SlugifyPipe],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,

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
