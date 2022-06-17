import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import { UserService } from 'src/app/services/users.service';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  coordinate: any;
  disponible = true;
  posLat = 0;
  posLong = 0;

  constructor(private userService: UserService, private platform: Platform) {}

  ngOnInit(): void {
    this.requestPermissions();
    if (this.disponible) {
      this.getCurrentCoordinate();
    }
  }

  async requestPermissions() {
    console.log('Platform:', this.platform.is('desktop'));

    if (!this.platform.is('desktop')) {
      const permResult = await Geolocation.requestPermissions();
      this.disponible = permResult !== null;
      if (!this.disponible) {
         this.userService.presentToast('GeoLocalizacion NO DISPONIBLE');
      }
    }
  }

  getCurrentCoordinate() {
    if (!this.disponible) {
      this.userService.presentToast('Geolocalizacion NO DISPONBLE');
      console.log('Plugin geolocation no disponible');
      return;
    }
     Geolocation.getCurrentPosition()
      .then((data) => {
        this.coordinate = {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
          accuracy: data.coords.accuracy,
        };
        const sText = 'Mi Posicion: ' + JSON.stringify(this.coordinate);
        this.userService.presentToast(sText, 'warning');
        this.posLong = this.coordinate.longitude;
        this.posLat = this.coordinate.latitude;
      })
      .catch((err) => {
        this.userService.presentToast(err);
        console.error(err);
      });
  }
  async geoShare() {
    const sText = 'Esta es mi Posicion: Lat: ' + this.posLat.toString() +' , Long: ' + this.posLong.toString();
    await Share.share({
      title: 'Localizacion',
      text: sText,
      dialogTitle: 'Compartir Ubicacion',
    });
  }
  async createMap() {
     this.newMap = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: this.posLat,
          lng: this.posLong,
        },
        zoom: 5,
      },
    });
  }
}
