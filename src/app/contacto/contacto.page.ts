import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { MenuController} from '@ionic/angular'; 

// HTTPS
import { HttpClient } from '@angular/common/http';

// Forms
import { FormGroup , FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  form: FormGroup;
  constructor(public http: HttpClient,
    private menu:MenuController) { }

  ngOnInit() {
    this.form = new FormGroup ({
      fullname: new FormControl ('', Validators.required),
      email: new FormControl ('', [Validators.required, Validators.email]),
      message: new FormControl ('', Validators.required)
    });
  }

  send () {
    console.log (this.form.value);

    this.http.post ("https://api-dirceturcuscoapp.web.app/api/v1/app-contact/", {
      fullname: this.form.value.fullname,
      email: this.form.value.email,
      message: this.form.value.message
    }).subscribe ((res: any) => {
      console.log (res);
    }, (error: any) => {
      console.log (error);
    });
  }
  open_menu () {
    this.menu.enable (true, 'first');
    this.menu.open ('first');
  }
}
