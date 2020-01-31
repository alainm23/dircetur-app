import { Component, OnInit } from '@angular/core';

// Ionic
import { NavController } from '@ionic/angular'; 
@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.page.html',
  styleUrls: ['./creditos.page.scss'],
})
export class CreditosPage implements OnInit {

  constructor(private navCtrl: NavController,) { }

  ngOnInit() {
  }

  go_home () {
    this.navCtrl.navigateRoot ('home');
  }
}
