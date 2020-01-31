import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Param
import { ActivatedRoute } from '@angular/router';

// Ionic
import { NavController, MenuController, IonContent } from '@ionic/angular'; 

// Services
import { DatabaseService } from '../services/database.service';

// Utils
import * as moment from 'moment';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  id: string;
  current_index: number = 0;
  evento: any;
  
  items: any [] = [];

  is_loading: boolean = true;
  is_upcomming_loading: boolean = true;
  current_date: string = moment ().format ();

  upcomming_eventos: any [] = [];
  constructor(private route: ActivatedRoute,
              private database: DatabaseService,
              private navCtrl: NavController,
              private menu:MenuController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get ('id');

    this.database.get_eventos ().subscribe ((res: any []) => {
      this.items = res;
      console.log (res);
      this.is_loading = false;
      this.view_blog_by_id (this.id);
    });

    this.get_events ();
  }

  view_blog_by_id (id: string) {
    this.evento = this.view_blog_by_index (this.deepIndexOf (id));
    this.id = this.evento.id;
  }

  view_blog_by_index (index: number) {
    return this.items [index];
  }

  deepIndexOf (id: string) {
    return this.items.findIndex(obj => obj.id === id);
  }

  view_event (i: number) {
    let index = this.deepIndexOf (this.id);
    index += i;

    if (index < 0) {
      index = this.items.length - 1;
    }

    if (index >= this.items.length) {
      index = 0;
    }

    this.evento = this.view_blog_by_index (index);
    this.id = this.evento.id;
  }

  onClick () {
    this.navCtrl.back ();
  }
  
  async get_events () {
    this.is_upcomming_loading = true;

    this.database.get_events_by_month (moment (this.current_date).format ('MM')).subscribe ((res: any) => {
      this.upcomming_eventos = this.order_items (res);
      this.is_upcomming_loading = false;

      console.log (this.upcomming_eventos);
    });
  }

  // Tools
  order_items (items: any []) {
    let color: number = 0; // azul, 1 = rojo

    return items.sort ((i1: any, i2: any) => {
      let d1 = new Date (i1.datageneral.fecha);
      let d2 = new Date(i2.datageneral.fecha);
      
      return d1.getTime () - d2.getTime ();
    }).filter ((e: any) => {
      let today = new Date ();
      let date = new Date (e.datageneral.fecha);
      return date.getTime () > today.getTime ();
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
    this.view_blog_by_id (item.data.id);
    this.content.scrollToTop (300);
    console.log (item);
    //this.navCtrl.navigateForward ('event-detail/' + item.data.id);
  }

  go_calendar () {
    this.navCtrl.navigateForward ('calendario');
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
}
