import { Component, OnInit } from '@angular/core';

// Ionic
import { NavController } from '@ionic/angular'; 

// Services
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-trc',
  templateUrl: './trc.page.html',
  styleUrls: ['./trc.page.scss'],
})
export class TrcPage implements OnInit {
  items: any [] = [];
  is_loading: boolean = true;
  constructor(private database: DatabaseService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.database.get_trc ().subscribe ((res: any []) => {
      this.items = res;
      this.is_loading = false;
      console.log (res);
    });
  }

  view (item: any) {
    this.navCtrl.navigateForward ('trc-detalle/' + item.id);
    console.log (item);
  }
}
