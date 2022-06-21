import { Component, OnInit } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UserService } from 'src/app/services/users.service';
@Component({
  selector: 'app-home',
  templateUrl: 'push.page.html',
  styleUrls: ['push.page.scss'],
})
export class PushPage implements OnInit {
  constructor(private router: Router,
              private platform: Platform,
              private userService: UserService ,) {}
  ngOnInit() {
    console.log('Iniciando Push');
    if (!this.platform.is('desktop')) {
      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });

      PushNotifications.addListener('registration', (token: Token) => {
        const stext ='RegistroPush Correcto \n Token: ' + token.value.toString();
        this.userService.presentToast(stext,'success');
      });

      PushNotifications.addListener('registrationError', (error: any) => {
        const stext = 'RegistroPush Erroneo:' + JSON.stringify(error);
        this.userService.presentToast(stext,'danger');
      });

      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotificationSchema) => {
        const stext = 'Push Recibido \n ' + JSON.stringify(notification);
//        this.userService.presentToast(stext,'warning');
        alert(stext);
        }
      );

      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
        const stext = 'Push Accion \n' + JSON.stringify(notification);
        this.userService.presentToast(stext,'success');
        }
      );
    }
    this.router.navigateByUrl('login');
  }
}
