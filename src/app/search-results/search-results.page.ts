import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
declare var require: any

// Ionic
import { ModalController, Events } from '@ionic/angular';

// AlgoliaSearch
import * as algoliasearch from 'algoliasearch/dist/algoliasearch.js';
import { environment } from '../../environments/environment';

// Services
import { DatabaseService } from '../services/database.service'
import { Storage } from '@ionic/storage';

// Modals
import { ReportProviderPage } from '../report-provider/report-provider.page';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
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
export class SearchResultsPage implements OnInit {
  @Input () search_text: string = "";

  client: any;
  algolia_index: any;

  idioma: string;
  etiquetas: any;

  items: any [] = [];
  is_loading:boolean = false;

  help_0: boolean = false;
  help_1: boolean = false;
  help_2: boolean = false;
  help_3: boolean = false;

  constructor(private database: DatabaseService, 
              private storage: Storage,
              private events: Events,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.initalgolia ();

    if (this.search_text != "") {
      this.search ();
    }

    this.get_etiquetas ();

    this.events.subscribe ('language_changed', (lang) => {
      this.idioma = lang;

      this.database.get_etiquetas ("turismo_" + lang).subscribe ((res: any) => {
        this.etiquetas = res;
      });
    });
  }
  
  get_etiquetas () {
    this.storage.get ('i18n').then ((response: string) => {
      let lang: string = response;

      if (lang === null || lang === undefined) {
        lang = 'es';
      }

      this.database.get_etiquetas ("turismo_" + lang).subscribe ((res: any) => {
        this.etiquetas = res;
      });
    });
  }

  initalgolia () {
    this.client = algoliasearch (environment.algolia.appId, environment.algolia.apiKey, { protocol: 'https:' });
    this.algolia_index = this.client.initIndex(environment.algolia.indexName);
  }

  close () {
    this.modalCtrl.dismiss (null, 'close');
  }

  on_click (item: any, type: number) {
    this.modalCtrl.dismiss ({
      item: item,
      type: type
    }, 'report');
  }

  onEnter () {
    if (this.search_text != "") {
      this.search ();
    } else {
      this.items = [];
    }
  }

  search () {
    this.is_loading = true;

    console.log (this.search_text);
    this.algolia_index.search({
      query: this.search_text
      //attributesToRetrieve: ['primary_text', 'secondary_text', 'id', 'type', "avatar"]
    }).then((data: any) => {
      this.is_loading = false;
      console.log ('algolia_search', data);
      this.items = [];  
      if (data.hits.length > 0) {
        this.items = data.hits;
      }
    });
  }

  view_item (item: any) {
    console.log (item);
    
    if (item.reveal_child === true) {
      item.reveal_child = false;
    } else {
      item.reveal_child = true;

      if (item.loaded_data !== true) {
        item.is_loading = true;

        let node: string;

        if (item.tipo === 'agencia') {
          node = "Agencias";
        } else if (item.tipo === 'alojamiento') {
          node = "Alojamientos";
        } else if (item.tipo === 'restaurante') {
          node = "Restaurantes";
        } else if (item.tipo === 'guia') {
          node = "Guias";
        }

        this.database.get_prestador_by_id (node, item.objectID).subscribe ((res: any) => {
          console.log (res);
          item.is_loading = false;
          item.loaded_data = true;

          item.data = res;
        });
      }
    }
  }

  async open_report (item: any = null, type: number = 0) {
    const modal = await this.modalCtrl.create({
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

  get_icon (item: any) {
    let style: string;
    if (item.reveal_child === true) {
      style = 'light';
    } else {
      style = 'blue';
    }

    //console.log ('icon', '/assets/img/' + item.tipo + '.svg');
    return 'assets/icon/' + item.tipo + '-' + style + '.svg';
  }

  view_help (i: number) {
    if (i === 0) {
      this.help_0 = !this.help_0;
    } else if (i === 1) {
      this.help_1 = !this.help_1;
    } else if (i === 2) {
      this.help_2 = !this.help_2;
    } else if (i === 3) {
      this.help_3 = !this.help_3;
    }
  }
}
