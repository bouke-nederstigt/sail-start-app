import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Geolocation} from '@ionic-native/geolocation';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker,
} from '@ionic-native/google-maps';

import {SailData} from "./sail-data";

/*
 Generated class for the MapProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class MapProvider {

  map: GoogleMap;

  constructor(public http: Http, private sailData: SailData, private geolocation: Geolocation) {
    console.log('Hello MapProvider Provider');
  }

  loadMarkers() {
    this.sailData.load().then(function (markers) {
        console.log("Markers: ", markers);

        let records = markers.data.result;

        for (let i = 0; i < records.length; i++) {
          let record = records[i];
          let markOpt: MarkerOptions = {
            position: new LatLng(record.latitude, record.longitude),
            title: "Marker: " + record.id
          }

          const marker: Marker = this.map.addMarker(markOpt)
            .then((marker: Marker) => {
              marker.showInfoWindow();
            });
        }
      }
    );
  }

  addMarker() {
    let location = this.geolocation.getCurrentPosition().then((position) => {
      let location = new LatLng(position.coords.latitude, position.coords.longitude);
      
      let markerOptions: MarkerOptions = {
        position: new LatLng(position.coords.latitude, position.coords.longitude),
        title: 'Boei'
      };

      this.map.addMarker(markerOptions)
        .then((marker: Marker) => {
          marker.showInfoWindow();
        });
    });
  }

  loadMap() {

    let location = this.geolocation.getCurrentPosition().then((position) => {
      let location = new LatLng(position.coords.latitude, position.coords.longitude);

      this.map = new GoogleMap('map', {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'latLng': location,
          'tilt': 30,
          'zoom': 15,
          'bearing': 50
        }
      });

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
        this.loadMarkers();
      });
    }).catch((error) => {
      console.log("Error getting location", error);
    })
  }
}
