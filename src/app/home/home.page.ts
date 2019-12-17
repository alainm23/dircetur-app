import { Component } from '@angular/core';

// Ionic
import { MenuController, LoadingController, ModalController } from '@ionic/angular'; 

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

  search_text: string = "";
  current_date: string = moment ().format ();
  constructor(private menu:MenuController,
              private loadingController: LoadingController,
              private slugifyPipe: SlugifyPipe,
              private modalController: ModalController,
              private database: DatabaseService
  ) {
    this.get_blogs ();
    this.get_events ();
  }

  get_blogs () {
    this.database.get_blogs ().subscribe ((res: any) => {
      console.log (res);
      this.blogs = res;
    });
  }

  async get_events () {
    this.database.get_events_by_month (moment (this.current_date).format ('MM')).subscribe ((res: any) => {
      console.log (res);
      this.eventos = this.order_items (res);
    });
  }

  view_blog (item: any) {
    let slug: string = item ['titulo_es'];
    //window.open('https://dirceturcuscoapp.firebaseapp.com/blog-detalle/' + this.slugifyPipe.transform (slug) + '/' + item.id, '_system');
  }

  // Tools
  order_items (items: any []) {
    return items.sort ((i1: any, i2: any) => {
      let d1 = new Date (i1.datageneral.fecha);
      let d2 = new Date(i2.datageneral.fecha);
      
      return d1.getTime () - d2.getTime ();
    }).filter ((e: any) => {
      let today = new Date ();
      let date = new Date (e.datageneral.fecha);
      return date.getTime () > today.getTime ();
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
      const modal = await this.modalController.create({
        component: SearchResultsPage,
        componentProps: {
          search_text: this.search_text
        },
        cssClass: 'puntopro-modal',
        //enterAnimation: myEnterAnimation,
        //leaveAnimation: myLeaveAnimation
      });

      await modal.present();
    }
  }

  async open_report () {
    const modal = await this.modalController.create({
      component: ReportProviderPage,
      /*
      componentProps: {
        search_text: this.search_text
      },
      */
      cssClass: 'puntopro-modal',
      //enterAnimation: myEnterAnimation,
      //leaveAnimation: myLeaveAnimation
    });

    await modal.present();
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
