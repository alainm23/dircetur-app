import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, ModalController, NavController } from '@ionic/angular';

// Services
import { DatabaseService } from '../services/database.service';
@Component({
  selector: 'app-boleto-turistico',
  templateUrl: './boleto-turistico.page.html',
  styleUrls: ['./boleto-turistico.page.scss'],
})
export class BoletoTuristicoPage implements OnInit {
  items: any = [];

  boleto_selected: any;
  nacionalidad_selected: string = "n";

  price: number = 0;

  is_loading: boolean = true;
  constructor(private database: DatabaseService,  private menu:MenuController) { }

  ngOnInit() {
    this.database.get_boletos_turisticos ().subscribe ((res: any []) => {
      this.items = res;
      console.log (res);
      this.is_loading = false;

      if (res.length > 0) {
        this.boleto_selected = res [0];
      }
    });
  }

  check_price () {
    if (this.nacionalidad_selected === 'n') {
      this.price = this.boleto_selected.precio_nacional;
    } else {
      this.price = this.boleto_selected.precio_extrajero;
    }
  }
  open_menu () {
    this.menu.enable (true, 'first');
    this.menu.open ('first');
  }
}
