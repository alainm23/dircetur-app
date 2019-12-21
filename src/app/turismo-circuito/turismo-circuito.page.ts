import { Component, OnInit } from '@angular/core';

// Services
import { DatabaseService } from '../services/database.service';
import { MenuController} from '@ionic/angular';
@Component({
  selector: 'app-turismo-circuito',
  templateUrl: './turismo-circuito.page.html',
  styleUrls: ['./turismo-circuito.page.scss'],
})
export class TurismoCircuitoPage implements OnInit {
  items: any [] = [];
  is_loading: boolean = true;
  constructor(private database: DatabaseService,
    private menu:MenuController) { }

  ngOnInit() {
    this.database.get_circuitos_turisticos ().subscribe ((res: any []) => {
      this.items = res;
      console.log (res);
      this.is_loading = false;
    });
  }
  open_menu () {
    this.menu.enable (true, 'first');
    this.menu.open ('first');
  }
}
