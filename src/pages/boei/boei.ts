import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {MapProvider} from "../../providers/map-provider";


@Component({
  selector: 'page-boei',
  templateUrl: 'boei.html'
})
export class BoeiPage {


  constructor(public navCtrl: NavController, public platform: Platform, private mapProvider: MapProvider) {
    platform.ready().then(() => {
      console.log("Platform ready");
    });
  }

  ngAfterViewInit() {
    console.log("view ready, start loading map");
    this.mapProvider.loadMap();
  }

  addMarker() {
    console.log("adding marker");
    this.mapProvider.addMarker()
  }
}
