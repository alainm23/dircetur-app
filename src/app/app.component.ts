import { Component } from '@angular/core';

import { Platform, NavController, AlertController, MenuController } from '@ionic/angular';

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
    public alertController: AlertController,
    private menu:MenuControl
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
  
  async presentAlertRadio () {
    const alert = await this.alertController.create({
      header: 'Radio',
      inputs: [
        {
          name: 'es',
          type: 'radio',
          label: 'Español',
          value: 'es',
          checked: true
        },
        {
          name: 'en',
          type: 'radio',
          label: 'English',
          value: 'en'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data: any) => {
            console.log('Confirm Ok', data);

            this.translate.use (data);
            this.storage.set ('i18n', data);
            moment.locale (data);
            this.i18n = data;
          }
        }
      ]
    });

    await alert.present();
  }
  
  open_menu () {
    this.menu.enable (true, 'first');
    this.menu.open ('close');
  }
}
