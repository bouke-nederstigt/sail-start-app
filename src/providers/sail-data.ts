import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {LatLng} from "@ionic-native/google-maps";

/*
 Generated class for the SailData provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SailData {
  data: any;

  bovenBoeiId: number;
  startschipId: number;

  url: string = 'https://quiet-eyrie-34800.herokuapp.com/v1/locations/';

  constructor(private http: Http) {
    this.data = null;
  }

  load() {
    console.log("Start loading markers");
    if (this.data != null) {
      console.log("existing data");
      console.log(this.data);
      return Promise.resolve(this.data);
    }

    console.log("Trying to load web data");

    return new Promise(resolve => {
      this.http.get(this.url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          resolve(error)
        });
    });
  }

  addLocation(coordinates: LatLng, locationType: string) {
    let body = {
      id: this.generateLocationId(locationType),
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      locationType: locationType
    };

    console.log(JSON.stringify(body));

    this.http.post(this.url, JSON.stringify(body), SailData.generateReqOptions()).map(res => res.json()).subscribe(data => {
      console.log(data)
    });
  }

  static generateReqOptions() {
    let header = new Headers({
      "Content-type": "application/json"
    });

    return new RequestOptions({headers: header});
  }

  generateLocationId(locationType: string) {
    let id = Math.floor(Math.random() * 1000);

    if (locationType == "startschip") {
      this.startschipId = id;
    } else if (locationType == "bovenboei") {
      this.bovenBoeiId = id;
    }

    return id;
  }

  getOnderboeiData() {
    if (!this.startschipId || !this.bovenBoeiId) {
      throw Error("Eerst startschip en bovenboei toevoegen");
    }

    let body = {
      "startschipId": this.startschipId,
      "bovenboeiId": this.bovenBoeiId
    };

    console.log(JSON.stringify(body));

    return new Promise(resolve => {
      this.http.post(this.url + "onderboei", JSON.stringify(body), SailData.generateReqOptions())
        .map(res => res.json())
        .subscribe(result => {
          console.log(result);
          resolve(result)
        }, error => {
          resolve(error)
        });
    });
  }

}
