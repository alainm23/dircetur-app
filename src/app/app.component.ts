import { Component } from '@angular/core';

import { Platform, NavController, MenuController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Services
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';  

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  i18n: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private navCtrl: NavController,
    private storage: Storage,
    private menu:MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('android')) {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#000000');
      }

      this.translate.addLangs(['es', 'en']);

      this.storage.get ('i18n').then ((response: string) => {
        let lang: string = response;

        if (lang === null || lang === undefined) {
          lang = 'es';
        }

        console.log ('Idioma', lang);

        this.translate.use (lang);
        this.storage.set ('i18n', lang);
        moment.locale (lang);
        this.i18n = lang;
      });
    });
  }

  go_page (page: string) {
    this.navCtrl.navigateForward (page);
  }
  open_menu () {
    this.menu.enable (true, 'first');
    this.menu.open ('close');
  }
}
