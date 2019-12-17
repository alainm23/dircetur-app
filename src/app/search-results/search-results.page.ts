import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
declare var require: any

// Services
import * as algoliasearch from 'algoliasearch/dist/algoliasearch.js';
import { environment } from '../../environments/environment';
import { DatabaseService } from '../services/database.service'

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

  items: any [] = [];
  is_loading:boolean = false;

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.initalgolia ();

    this.search ();
  }

  initalgolia () {
    this.client = algoliasearch (environment.algolia.appId, environment.algolia.apiKey, { protocol: 'https:' });
    this.algolia_index = this.client.initIndex(environment.algolia.indexName);
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
}
