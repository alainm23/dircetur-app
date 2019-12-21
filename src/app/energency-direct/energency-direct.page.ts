import { Component, OnInit } from '@angular/core';
import { MenuController} from '@ionic/angular'; 

@Component({
  selector: 'app-energency-direct',
  templateUrl: './energency-direct.page.html',
  styleUrls: ['./energency-direct.page.scss'],
})
export class EnergencyDirectPage implements OnInit {

  constructor(private menu:MenuController) { }

  ngOnInit() {
  }

  open_menu () {
    this.menu.enable (true, 'first');
    this.menu.open ('first');
  }
}
