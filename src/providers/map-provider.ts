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
  Marker, Polyline,
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

  constructor(public http: Http, private sailData: SailData, private geolocation: Geolocation, private googleMaps: GoogleMaps) {
    console.log('Hello MapProvider Provider');
  }

  loadMarkers(providedMap) {

    this.sailData.load().then(function (markers) {
        console.log("Markers: ", markers);

        let records = markers;

        for (let i = 0; i < records.length; i++) {
          let record = records[i];
          let markOpt: MarkerOptions = {
            position: new LatLng(record.latitude, record.longitude),
            title: "Marker: " + record.id
          }

          const marker: Marker = providedMap.addMarker(markOpt)
            .then((marker: Marker) => {
              marker.showInfoWindow();
            });
        }
      }
    ).catch(error => {
      console.log(error)
    });
  }

  addMarker(boeiType: string) {
    let location = this.geolocation.getCurrentPosition().then((position) => {
      let location = new LatLng(position.coords.latitude, position.coords.longitude);

      let markerOptions: MarkerOptions = {
        position: location,
        title: boeiType
      };

      this.placeMarker(location, markerOptions);
      this.sailData.addLocation(location, boeiType)
    });
  }

  placeMarker(location: LatLng, markerOptions: MarkerOptions) {
    this.map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
      });
  }

  addOnderboeiMarker() {
    this.sailData.getOnderboeiData().then((onderboei) => {
      let location = new LatLng(onderboei['latitude'], onderboei['longitude']);
      let markerOptions: MarkerOptions = {
        position: location,
        title: "onderboei"
      };

      this.placeMarker(location, markerOptions);
    });
  }

  loadMap() {

    let location = this.geolocation.getCurrentPosition().then((position) => {
      let location = new LatLng(position.coords.latitude, position.coords.longitude);

      this.map = new GoogleMap('map', {
        'backgroundColor': 'black',
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
        this.loadMarkers(this.map);
      });
    }).catch((error) => {
      console.log("Error getting location", error);
    })
  }

  trackSchip() {
    console.log("Start tracking schip");
    let markers = this.sailData.load().then(function (markers) {
      return markers;
    });

    this.geolocation.watchPosition().subscribe(function (position) {
      console.log("markers in tracker", markers);
      // let marker = markers.find(marker => marker.id == 1);
      markers.then((res) => {
        let marker = res.find(marker => marker.id == 1)
        let markerPosition = new LatLng(marker.latitude, marker.longitude);

        console.log("Marker  created", marker);
        let currentPosition = new LatLng(position.coords.latitude, position.coords.longitude);
        let points = [markerPosition, currentPosition];

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
          console.log('Map is ready!');
          console.log("points", points);
          this.map.addPolyline({points: points, color: "#AA00FF", width: 10, geodesic: true});
        });
      });
    });
  }
}
