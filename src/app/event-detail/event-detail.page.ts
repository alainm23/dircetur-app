import { Component, OnInit } from '@angular/core';

// Param
import { ActivatedRoute } from '@angular/router';

// Ionic
import { MenuController, LoadingController, ModalController, NavController } from '@ionic/angular'; 

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
  id: string;
  evento: any;

  is_loading: boolean = true;
  is_upcomming_loading: boolean = true;
  current_date: string = moment ().format ();

  upcomming_eventos: any [] = [];
  constructor(private route: ActivatedRoute,
              private database: DatabaseService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get ('id');
    this.database.get_evento_by_key (this.id).subscribe ((res: any) => {
      this.evento = res;
      console.log (res);
      this.is_loading = false;
    });

    this.get_events ();
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
    console.log (item);
    this.navCtrl.navigateForward ('event-detail/' + item.data.id);
  }

  get_date_format (date: string, format: string) {
    return moment (date).format (format);
  }
}
