import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BoeiPage} from "../boei/boei";
import {SailData} from "../../providers/sail-data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private sailData: SailData) {
    console.log(sailData.load())
  }

  goToBoei(){
    this.navCtrl.push(BoeiPage)
  }

}
