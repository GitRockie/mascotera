import {Component, ElementRef, OnInit, ViewChild, NgZone,} from '@angular/core';
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
//  @ViewChild('map')
  @ViewChild('map', { static: true }) mapRef: ElementRef;
//  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  coordinate: any;
  disponible = true;
  posLat = 33.6;
  posLong = -117.9;

  constructor(
    private userService: UserService,
    private zone: NgZone,
    private platform: Platform) {}

  ngOnInit(): void {
    this.requestPermissions();
    if (this.disponible) {
      this.getCurrentCoordinate();
//      this.createMap();
    }
  }

  async requestPermissions() {
  console.log('Platform:',this.platform.is('desktop'));
  if(!this.platform.is('desktop'))
    {
      const permResult = await Geolocation.requestPermissions();
      console.log('Perm request result: ', permResult);
      this.disponible = (permResult != null);
      if (!this.disponible)
      {
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
      })
      .catch((err) => {
        this.userService.presentToast(err);
        console.error(err);
      });
  }
  async geoShare() {
    await Share.share({
      title: 'Localizacion',
      text: 'Esta es mi Posicion: `${posLat)`, [´$postLong´]',
//      url: 'http://ionicframework.com/',
      dialogTitle: 'Compartin Ubicacion',
    });
  }
  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'Mymap',
      apiKey: environment.apiKey,
      element: this.mapRef.nativeElement,
      config: {
        center: {
          lat: this.posLat,
          lng: this.posLong,
        },
        zoom: 8,
      },
    });

    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: this.posLat,
        lng: this.posLong,
      },
      title: 'Estoy AQUI',
    });

  }
}
