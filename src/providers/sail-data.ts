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

  addLocation(coordinates: LatLng, title: string) {
    let header = new Headers({
      "Content-type": "application/json"
    });
    let reqOptions = new RequestOptions({headers: header});

    let body = {
      id: 2,
      latitude: coordinates.lat,
      longitude: coordinates.lng
    }

    console.log(JSON.stringify(body));

    this.http.post(this.url, JSON.stringify(body), reqOptions).map(res => res.json()).subscribe(data => {
      console.log(data)
    });
  }

}
