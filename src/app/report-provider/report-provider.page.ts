import { Component, OnInit } from '@angular/core';

// Ionic
import { ModalController } from '@ionic/angular';

// Forms
import { FormGroup , FormControl, Validators } from '@angular/forms';

// AlgoliaSearch
import * as algoliasearch from 'algoliasearch/dist/algoliasearch.js';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-report-provider',
  templateUrl: './report-provider.page.html',
  styleUrls: ['./report-provider.page.scss'],
})
export class ReportProviderPage implements OnInit {
  form: FormGroup;

  client: any;
  algolia_index: any;
  show_searchbox: boolean = false;

  items: any [] = [];
  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {
    // Init Algolia
    this.client = algoliasearch (environment.algolia.appId, environment.algolia.apiKey, { protocol: 'https:' });
    this.algolia_index = this.client.initIndex(environment.algolia.indexName);

    this.form = new FormGroup ({
      //type: new FormControl ('', Validators.required),
      provider: new FormControl ('', Validators.required),
      provider_data: new FormControl ('', Validators.required),
      fullname: new FormControl ('', Validators.required),
      email: new FormControl ('', Validators.required),
      phone_number: new FormControl ('', Validators.required),
      description: new FormControl ('', Validators.required)
    });
  }

  close () {
    this.modalCtrl.dismiss (null, 'close');
  }

  onChange () {
    if (this.form.value.provider_type === 'buscar') {
      //this.modalCtrl.dismiss (null, 'open_search_modal');
    }
  }

  on_input_change (value: any) {
    let search_text: string = value;
    if (search_text != '' && search_text.length >= 2) {
      this.show_searchbox = true;

      this.algolia_index.search({
        query: search_text
      }).then((data: any) => {
        this.items = data.hits;

        if (this.form.value.provider_data === null) {
          
        } else {

        }
        /*
        if (this.items.length > 0) {
          //this.show_searchbox = true;
        } else {
          //this.show_searchbox = false;
        }
        /*.filter ((e: any) => {
          return e.tipo === this.form.value.provider_type
        });
        console.log ('algolia_search', this.items);
        */
      });
    } else {
      this.show_searchbox = false;
    }
  }

  selct_item (item: any) {
    if (item != null) {
      this.form.controls ['provider_data'].setValue (item);
      this.form.controls ['provider'].setValue (item.nombre_comercial);

      this.show_searchbox = false;
    }
  }
}
