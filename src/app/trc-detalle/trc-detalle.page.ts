import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

// Param
import { ActivatedRoute } from '@angular/router';

// Services
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-trc-detalle',
  templateUrl: './trc-detalle.page.html',
  styleUrls: ['./trc-detalle.page.scss'],
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
export class TrcDetallePage implements OnInit {
  id: string;

  data: any;
  items: any [];

  is_loading: boolean = true;
  is_items_loading: boolean = true;
  constructor(private route: ActivatedRoute,
              private database: DatabaseService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get ('id');

    this.database.get_trc_by_id (this.id).subscribe ((res: any) => {
      this.data = res;
      console.log (res);

      this.is_loading = false;
    });

    /*
    this.database.get_dias_by_circuito_turistico (this.id).subscribe ((res: any []) => {
      this.items = res;
      console.log (res);

      this.is_items_loading = false;
    });
    */
  }
}
