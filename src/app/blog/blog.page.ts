import { Component, OnInit } from '@angular/core';

// Ionic
import { NavController, MenuController } from '@ionic/angular'; 

// Services
import { DatabaseService } from '../services/database.service';
import { Storage } from '@ionic/storage';

// Utils
import * as moment from 'moment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  items: any [] = [];
  items_backup: any [] = [];

  categories: any [] = [];

  category_selected: string = "";

  is_category_loading: boolean = true;
  is_loading: boolean = true;
  constructor(private database: DatabaseService,
              private navCtrl: NavController,
              private menu:MenuController) { }

  ngOnInit() {
    this.database.get_blog_categories ().subscribe ((res: any []) => {
      this.categories = res;
      console.log (res);
      this.is_category_loading = false;
    });

    this.database.get_blogs ().subscribe ((res: any []) => {
      this.items = res;
      this.items_backup = res;
      this.is_loading = false;

      console.log (res);
    });
  }

  onClick () {
    this.navCtrl.back ();
  }
  
  filter () {
    this.items = this.items_backup;

    if (this.category_selected != "") {
      this.items = this.items.filter ((i: any) => {
        return i.categoria.id === this.category_selected;
      });
    }
  }

  view_blog (item: any) {
    console.log (item);
    let slug: string = item ['titulo_es'];
    this.navCtrl.navigateForward ('blog-articulo/' + item.id);
    //window.open('https://dirceturcuscoapp.firebaseapp.com/blog-detalle/' + this.slugifyPipe.transform (slug) + '/' + item.id, '_system');
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
