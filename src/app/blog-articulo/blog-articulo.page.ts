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
              private menu:MenuController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get ('id');
    
    this.database.get_blog_by_id (this.id).subscribe ((res: any) => {
      this.blog = res;
      this.is_loading = false;

      console.log (res);
    });
  }

  get_date_format (date: string, format: string) {
    return moment (date).format (format);
  }
  open_menu () {
    this.menu.enable (true, 'first');
    this.menu.open ('first');
  }
}
