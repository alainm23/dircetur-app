import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

// Ionic
import { ModalController, LoadingController, AlertController, MenuController, NavController } from '@ionic/angular'; 

// Modals
import { ReportProviderPage } from '../report-provider/report-provider.page';

// HTTPS
import { HttpClient } from '@angular/common/http';

// Forms
import { FormGroup , FormControl, Validators } from '@angular/forms';

// Google Maps
declare var google;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  map: any;
  @ViewChild('map', { static: false }) mapRef: ElementRef;

  form: FormGroup;
  constructor(private http: HttpClient, 
              private modalController: ModalController,
              private alertController: AlertController,
              private navCtrl: NavController,
              private menu:MenuController,
              private loadingController: LoadingController) { }
  
  ngOnInit() {
    this.form = new FormGroup ({
      fullname: new FormControl ('', Validators.required),
      email: new FormControl ('', [Validators.required, Validators.email]),
      message: new FormControl ('', Validators.required)
    });
  }

  ngAfterViewInit() {
    this.InitMap ();
  }
  
  async send () {
    const loading = await this.loadingController.create({
      message: '...'
    });
    await loading.present();

    console.log (this.form.value);

    this.http.post ("https://api-dirceturcuscoapp.web.app/api/v1/app-contact/", {
      fullname: this.form.value.fullname,
      email: this.form.value.email,
      message: this.form.value.message
    }).subscribe (async (res: any) => {
      console.log (res);
      this.form.reset ();
      
      await loading.dismiss ();

      const alert = await this.alertController.create({
        header: 'Mensaje enviado',
        message: 'This is an alert message.',
        buttons: ['OK']
      });
  
      await alert.present();
    }, async (error: any) => {
      console.log (error);
      await loading.dismiss ();
    });
  }

  async open_report (item: any = null, type: number = 0) {
    const modal = await this.modalController.create({
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

  open_menu () {
    this.menu.enable (true, 'first');
    this.menu.open ('first');
  }

  onClick () {
    this.navCtrl.back ();
  }

  InitMap () {
    let location = new google.maps.LatLng (-13.5226522, -71.9671296);

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

    this.map = new google.maps.Map (this.mapRef.nativeElement, options);

    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Dircetur Cusco',
      animation: google.maps.Animation.DROP
    });
  }
}
