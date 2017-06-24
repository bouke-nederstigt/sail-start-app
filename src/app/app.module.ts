import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {BoeiPage} from "../pages/boei/boei";
import {GoogleMaps} from "@ionic-native/google-maps";
import {HttpModule} from "@angular/http";
import {SailData} from "../providers/sail-data";
import { Geolocation } from '@ionic-native/geolocation';
import {MapProvider} from "../providers/map-provider";
import {SchipPage} from "../pages/schip/schip";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BoeiPage,
    SchipPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BoeiPage,
    SchipPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMaps,
    SailData,
    MapProvider
  ]
})
export class AppModule {}
