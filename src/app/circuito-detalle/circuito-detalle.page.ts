import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MenuController, NavController} from '@ionic/angular'; 
// Param
import { ActivatedRoute } from '@angular/router';

// Services
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-circuito-detalle',
  templateUrl: './circuito-detalle.page.html',
  styleUrls: ['./circuito-detalle.page.scss'],
  animations: [
    trigger('animation-top', [
      transition(':enter',
        [style({ transform: 'translateY(-12%)', opacity: 0 }),
        animate('154ms', style({ transform: 'translateY(0)', 'opacity': 1 }))]),
      transition(':leave',
        [style({ transform: 'translateY(0)', 'opacity': 1 }),
        animate('154ms', style({ transform: 'translateY(-12%)', 'opacity': 0 }))])
    ])
  ]
})
export class CircuitoDetallePage implements OnInit {
  id: string;

  data: any;
  items: any [];

  is_loading: boolean = true;
  is_items_loading: boolean = true;
  constructor(private route: ActivatedRoute,
              private database: DatabaseService,
              private navCtrl: NavController,
              private menu:MenuController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get ('id');

    this.database.get_circuito_turistico_by_id (this.id).subscribe ((res: any) => {
      this.data = res;
      console.log (res);

      this.is_loading = false;
    });
    
    this.database.get_dias_by_circuito_turistico (this.id).subscribe ((res: any []) => {
      this.items = res;
      console.log (res);

      this.is_items_loading = false;
    });
  }

  onClick () {
    this.navCtrl.back ();
  }

  view_item (item: any) {
    if (item.reveal_child === true) {
      item.reveal_child = false;
    } else {
      item.reveal_child = true;
    }
  }
  open_menu () {
    this.menu.enable (true, 'first');
    this.menu.open ('first');
  }

  get_value (item: any, val: string) {
    let returned = item [val + '_' + this.database.idioma];
        
    if (returned === null || returned === undefined) {
      returned = item [val + '_es'];
    }
    
    if (returned === null || returned === undefined) {
      returned = item [val];
    }

    if (returned === null || returned === undefined) {
      returned = "";
    }

    return returned;
  }
}
