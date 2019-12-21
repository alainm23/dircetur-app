import { Component } from '@angular/core';

// Ionic
import { MenuController, LoadingController, ModalController, NavController } from '@ionic/angular'; 

// Services
import { DatabaseService } from '../services/database.service';
import { SlugifyPipe } from '../pipes/slugify.pipe';

// Modals
import { SearchResultsPage } from '../search-results/search-results.page';
import { ReportProviderPage } from '../report-provider/report-provider.page';

// Utils
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [SlugifyPipe]
})
export class HomePage {
  blogs: any = [];
  eventos: any = [];
  circuitos: any = [];

  search_text: string = "";
  current_date: string = moment ().format ();

  is_calendar_loading: boolean = false;
  is_blog_loading: boolean = true;
  is_circuitos_loading: boolean = true;

  constructor(private menu:MenuController,
              private loadingController: LoadingController,
              private slugifyPipe: SlugifyPipe,
              private modalController: ModalController,
              private navCtrl: NavController,
              private database: DatabaseService
  ) {
    this.get_blogs ();
    this.get_events ();
    this.get_circuitos ();
  }

  get_blogs () {
    this.database.get_last_blogs (6).subscribe ((res: any) => {
      this.blogs = res;
      this.is_blog_loading = false;
    });
  }

  get_circuitos () {
    this.database.get_circuitos_turisticos_limit (3).subscribe ((res: any []) => {
      this.circuitos = res;
      this.is_circuitos_loading = false;
    });
  }

  async get_events () {
    this.is_calendar_loading = true;

    this.database.get_events_by_month (moment (this.current_date).format ('MM')).subscribe ((res: any) => {
      this.eventos = this.order_items (res);
      this.is_calendar_loading = false;
    });
  }

  view_blog (item: any) {
    let slug: string = item ['titulo_es'];
    this.navCtrl.navigateForward ('blog-articulo/' + item.id);
    //window.open('https://dirceturcuscoapp.firebaseapp.com/blog-detalle/' + this.slugifyPipe.transform (slug) + '/' + item.id, '_system');
  }

  view_calendar_detail (item: any) {
    this.navCtrl.navigateForward ('event-detail/' + item.data.id);
  }

  view_circuito_detalle (item: any) {
    this.navCtrl.navigateForward ('circuito-detalle/' + item.id);
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

  check_backbutton () {
    let today = new Date ();
    let date = new Date (this.current_date);

    return date.getTime () > today.getTime ();
  }

  open_menu () {
    this.menu.enable (true, 'first');
    this.menu.open ('first');
  }

  async onEnter () {
    if (this.search_text != "") {
      this.open_search_modal ();
    }
  }

  async open_search_modal () {
    const modal = await this.modalController.create({
      component: SearchResultsPage,
      componentProps: {
        search_text: this.search_text
      },
      cssClass: 'puntopro-modal',
      //enterAnimation: myEnterAnimation,
      //leaveAnimation: myLeaveAnimation
    });

    modal.onDidDismiss ().then ((response: any) => {
      this.search_text = '';
      /*
      if (response.role == 'report') {
        console.log (response.data);
        this.open_report (response.data.item, response.data.type);
      }
      */
    });

    await modal.present();
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

  go_calendar () {
    this.navCtrl.navigateForward ('calendario');
  }

  go_boleto_turistico () {
    this.navCtrl.navigateForward ('boleto-turistico');
  }

  go_circuitos () {
    this.navCtrl.navigateForward ('turismo-circuito');
  }

  // Datetime fuctions
  get_format_date (date: string) {
    return moment (date).format ('L');
  }

  change_month (n: number) {
    this.current_date = moment (this.current_date).add (n, 'months').format ();
    this.get_events ();
  }

  get_calendar_header () {
    return moment (this.current_date).format ('MMMM [,] YYYY');
  }

  get_date_format (date: string, format: string) {
    return moment (date).format (format);
  }
}
