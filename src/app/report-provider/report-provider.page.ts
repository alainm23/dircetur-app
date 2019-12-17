import { Component, OnInit } from '@angular/core';

// Ionic
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report-provider',
  templateUrl: './report-provider.page.html',
  styleUrls: ['./report-provider.page.scss'],
})
export class ReportProviderPage implements OnInit {

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {
  }

  close () {
    this.modalCtrl.dismiss (null, 'close');
  }
}
