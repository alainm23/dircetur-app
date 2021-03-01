import { Component, OnInit, ElementRef } from '@angular/core';

// Ionic
import { MenuController, NavController } from '@ionic/angular'; 

// Services
import { DatabaseService } from '../services/database.service';

// Utils
import * as moment from 'moment';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  eventos: any [] = [];
  eventos_backup: any [] = [];

  tipos: any [] = [];
  tipo_selected: any = "todos";

  current_date: string = moment ().format ();
  is_loading: boolean = false;

  constructor(private database: DatabaseService,
              private navCtrl: NavController,
              private el: ElementRef,
              private menu:MenuController) 
  {
    
  }

  onChange () {
    this.eventos = this.eventos_backup;

    if (this.tipo_selected !== 'todos') {
      this.eventos = this.eventos.filter ((item: any) => {
        return item.datageneral.tipo.id === this.tipo_selected;
      });
    }
  }

  ngOnInit() {
    this.get_events ();
    this.get_all_categories ();
  }

  onClick () {
    this.navCtrl.back ();
  }

  get_all_categories () {
    this.database.get_eventos_categorias ().subscribe ((res: any []) => {
      this.tipos = res;
    });
  }

  ionViewDidEnter() {
    // ion-select customizing
    const ionSelects = document.querySelectorAll('ion-select');
    let img = null;
    ionSelects.forEach((ionSelect) => {
      const selectIconInner = ionSelect.shadowRoot.querySelector('.select-icon').querySelector('.select-icon-inner');
      if(selectIconInner){
        selectIconInner.setAttribute('style', 'display: none !important');
      }
    });
  }

  async get_events () {
    this.is_loading = true;

    this.database.get_events_by_month (moment (this.current_date).format ('MM')).subscribe ((res: any) => {
      this.eventos = this.order_items (res);
      this.eventos_backup = this.order_items (res);
      this.is_loading = false;
      console.log (this.eventos);
    });
  }
  
  // Tools
  order_items (items: any []) {
    let color: number = 0; // azul, 1 = rojo

    return items.sort ((i1: any, i2: any) => {
      let d1 = new Date (i1.datageneral.fecha);
      let d2 = new Date(i2.datageneral.fecha);
      
      return d1.getTime () - d2.getTime ();
    }).filter ((i: any) => {
      i.color = color;

      if (color === 0) {
        color = 1;
      } else {
        color = 0;
      }

      return true;
    });
  }

  view_calendar_detail (item: any) {
    console.log (item);
    this.navCtrl.navigateForward ('event-detail/' + item.data.id);
  }

  // Datetime fuctions
  get_format_date (date: string) {
    return moment (date).format ('L');
  }

  change_month (n: number) {
    this.current_date = moment (this.current_date).add (n, 'months').format ();
    this.get_events ();
  }

  get_current_date_format (format: string) {
    return moment (this.current_date).format (format);
  }

  get_date_format (date: string, format: string) {
    return moment (date).format (format);
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

  check_backbutton () {
    let current_date = new Date (this.current_date).getMonth ();

    if (current_date <= 0) {
      return false;
    }

    return true;
  }

  check_next_button () {
    let current_date = new Date (this.current_date).getMonth ();

    if (current_date >= 11) {
      return false;
    }

    return true;
  }
}
