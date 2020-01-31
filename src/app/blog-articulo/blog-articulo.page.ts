import { Component, OnInit } from '@angular/core';

// Param
import { ActivatedRoute } from '@angular/router';

// Ionic
import { MenuController, NavController } from '@ionic/angular'; 

// Services
import { DatabaseService } from '../services/database.service';

// Utils
import * as moment from 'moment';

@Component({
  selector: 'app-blog-articulo',
  templateUrl: './blog-articulo.page.html',
  styleUrls: ['./blog-articulo.page.scss'],
})
export class BlogArticuloPage implements OnInit {
  id: string;
  blog: any;
  
  is_loading: boolean = true;
  constructor(private route: ActivatedRoute,
              private database: DatabaseService,
              private navCtrl: NavController,
              private menu:MenuController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get ('id');

    this.database.get_blog_by_id (this.id).subscribe ((res: any) => {
      this.blog = res;
      this.is_loading = false;

      console.log (res);
    });
  }

  onClick () {
    this.navCtrl.back ();
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
