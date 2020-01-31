import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

// Services
import { DatabaseService } from '../services/database.service';

// Google Maps
declare var google;

@Component({
  selector: 'app-boleto-turistico',
  templateUrl: './boleto-turistico.page.html',
  styleUrls: ['./boleto-turistico.page.scss'],
})
export class BoletoTuristicoPage implements OnInit {
  map_01: any;
  @ViewChild('map', { static: false }) mapRef01: ElementRef;

  map_02: any;
  @ViewChild('map2', { static: false }) mapRef02: ElementRef;

  items: any = [];

  boleto_selected: any;
  nacionalidad_selected: string = "n";

  price: number = 0;

  is_loading: boolean = true;
  constructor(private database: DatabaseService,  private menu:MenuController, private navCtrl: NavController,) { }

  ngOnInit() {
    this.database.get_boletos_turisticos ().subscribe ((res: any []) => {
      this.items = res;
      console.log (res);
      this.is_loading = false;

      if (res.length > 0) {
        this.boleto_selected = res [0];
      }
    });
  }

  ngAfterViewInit() {
    this.InitMap_01 ();
    this.InitMap_02 ();
  }

  onClick () {
    this.navCtrl.back ();
  }

  check_price () {
    if (this.nacionalidad_selected === 'n') {
      this.price = this.boleto_selected.precio_nacional;
    } else {
      this.price = this.boleto_selected.precio_extrajero;
    }
  }
  open_menu () {
    this.menu.enable (true, 'first');
    this.menu.open ('first');
  }

  InitMap_01 () {
    let location = new google.maps.LatLng (-13.5177589, -71.9787678);

    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true,
      streetViewControl: false,
      disableDoubleClickZoom: false,
      clickableIcons: false,
      scaleControl: true,
      mapTypeId: 'roadmap',
    }

    this.map_01 = new google.maps.Map (this.mapRef01.nativeElement, options);

    let marker = new google.maps.Marker({
      position: location,
      map: this.map_01,
      title: 'Dircetur Cusco',
      animation: google.maps.Animation.DROP
    });
  }

  InitMap_02 () {
    let location = new google.maps.LatLng (-13.5179744, -71.9793232);

    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true,
      streetViewControl: false,
      disableDoubleClickZoom: false,
      clickableIcons: false,
      scaleControl: true,
      mapTypeId: 'roadmap',
    }

    this.map_02 = new google.maps.Map (this.mapRef02.nativeElement, options);

    let marker = new google.maps.Marker({
      position: location,
      map: this.map_02,
      title: 'Dircetur Cusco',
      animation: google.maps.Animation.DROP
    });
  }
}
