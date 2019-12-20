import { Component, OnInit } from '@angular/core';

// Services
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-trc',
  templateUrl: './trc.page.html',
  styleUrls: ['./trc.page.scss'],
})
export class TrcPage implements OnInit {
  items: any [] = [];
  is_loading: boolean = true;
  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.database.get_trc ().subscribe ((res: any []) => {
      this.items = res;
      this.is_loading = false;
      console.log (res);
    });
  }

}
