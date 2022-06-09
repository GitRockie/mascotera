import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-home',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  posLat =    33.6;
  posLong = -117.9;

  constructor() {}

  ngOnInit(): void {
    this.currentLocation();
 //   this.createMap();
  }

  currentLocation() {
    const currentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      this.posLong = coordinates.coords.longitude;
      this.posLat = coordinates.coords.latitude;
      console.log('Current position:', coordinates);
    };
  };
  async geoShare(){
    const gShare = await Share.share({
      title: 'Mi Posicion',
      text: 'Lat: ' + `[$posLat]` +', Long: ' + `[$posLong]`,
//      url: 'http://ionicframework.com/',
      dialogTitle: 'Esta es mi Posicion',
    });
}
  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'myMap',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: this.posLat,
          lng: this.posLong,
        },
        zoom: 8,
      },
    });
  }
}
