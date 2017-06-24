import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {MapProvider} from "../../providers/map-provider";


@Component({
  selector: 'page-schip',
  templateUrl: 'schip.html'
})
export class SchipPage {


  constructor(public navCtrl: NavController, public platform: Platform, private mapProvider: MapProvider) {
    platform.ready().then(() => {
      console.log("Platform ready");
    });
  }

  ngAfterViewInit() {
    console.log("view ready, start loading map");
    this.mapProvider.loadMap();
    this.mapProvider.trackSchip();

  }


}
