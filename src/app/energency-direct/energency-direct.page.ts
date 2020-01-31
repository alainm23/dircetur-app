import { Component, OnInit } from '@angular/core';

// Ionic
import { ModalController, MenuController, NavController } from '@ionic/angular'; 

// Modals
import { ReportProviderPage } from '../report-provider/report-provider.page';

@Component({
  selector: 'app-energency-direct',
  templateUrl: './energency-direct.page.html',
  styleUrls: ['./energency-direct.page.scss'],
})
export class EnergencyDirectPage implements OnInit {


  constructor(private modalController: ModalController, private menu:MenuController, private navCtrl: NavController) { }
  
  ngOnInit() {
  }

  async open_report (item: any = null, type: number = 0) {
    const modal = await this.modalController.create({
      component: ReportProviderPage,
      componentProps: {
        item: item,
        type: type
      },
      //enterAnimation: myEnterAnimation,
      //leaveAnimation: myLeaveAnimation
    });

    await modal.present();
  }
  
  open_menu () {
    this.menu.enable (true, 'first');
    this.menu.open ('first');
  }

  onClick () {
    this.navCtrl.back ();
  }
}
