import { Component } from '@angular/core';

import { Platform, NavController, AlertController, MenuController, Events } from '@ionic/angular';

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
  i18n: string = 'es';
  flag: string = 'assets/icon/es.png';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private navCtrl: NavController,
    private storage: Storage,
    private alertController: AlertController,
    private menu: MenuController,
    private events: Events) {
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

  go_home () {
    this.navCtrl.navigateRoot ('home');
    this.menu.close ('first');
  }
  
  change_language () {
    this.translate.use (this.i18n);
    this.storage.set ('i18n', this.i18n);
    moment.locale (this.i18n);

    this.flag = "assets/icon/" + this.i18n + ".png";

    this.events.publish ('language_changed', this.i18n);
  }

  open_menu () {
    this.menu.enable (true, 'first');
    this.menu.close ('first');
  }
}
