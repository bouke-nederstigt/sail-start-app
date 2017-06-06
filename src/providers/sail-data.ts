import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the SailData provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SailData {
  data: any;

  constructor(private http: Http) {
    this.data = null;
  }

  load() {
    console.log("Start loading markers")
    if (this.data) {
      console.log("existing data")
      console.log(this.data)
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('https://quiet-eyrie-34800.herokuapp.com/v1/locations/')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

}
