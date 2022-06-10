import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  NgZone,
} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import { UserService } from 'src/app/services/users.service';

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
  posLat = 33.6;
  posLong = -117.9;

  constructor(private userService: UserService, private zone: NgZone) {}

  ngOnInit(): void {
    this.requestPermissions();
    if (this.disponible) {
      this.getCurrentCoordinate();
      this.createMap();
    }
  }

  async requestPermissions() {
    const permResult = await Geolocation.requestPermissions();
    console.log('Perm request result: ', permResult);
    this.disponible = permResult != null;
    return;
  }
  /*
  currentLocation() {
    const currentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      this.posLong = coordinates.coords.longitude;
      this.posLat = coordinates.coords.latitude;
      console.log('Current position:', coordinates);
    };
  };
*/
  getCurrentCoordinate() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
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
  /*
  watchPosition() {
    try {
      this.watchId = Geolocation.watchPosition({}, (position, err) => {
        console.log('Watch', position);
        this.zone.run(() => {
          this.watchCoordinate = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        });
        this.posLat = position.coords.latitude;
        this.posLong = position.coords.longitude;
      });
    } catch (e) {
      this.userService.presentToast(e);
      console.error(e);
    }
  }
*/
  async geoShare() {
    await Share.share({
      title: 'Localizacion',
      text: 'Esta es mi Posicion: [´$postLat´], [´$postLong´]',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Compartin Ubicacion',
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
    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: this.posLat,
        lng: this.posLong,
      },
    });
  }
}
