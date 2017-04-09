import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BoeiPage} from "../boei/boei";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToBoei(){
    this.navCtrl.push(BoeiPage)
  }

}
