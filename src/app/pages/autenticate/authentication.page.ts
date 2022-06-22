import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, } from '../../services/authentication.service';
import { UserService } from 'src/app/services/users.service';
import { Usuario, UserPhoto } from 'src/app/models/interface';
import { PhotoService } from 'src/app/services/photo.service';

import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  url: string; // The URL we're at: login, signup, or reset.
  pageTitle = 'Sign In';
  actionButtonText = 'Sign In';
  user: Usuario;
  photo: any;
  disable = false;

  constructor(
    private readonly router: Router,
    private readonly auth: AuthenticationService,
    private photoService: PhotoService,
    private userService: UserService,
    private platform: Platform,
  ) {}

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit(): void {

    if (this.platform.is('desktop')) { this.disable = true; };

    this.url = this.router.url.substring(1);
    //    console.log('url:', this.url);
    if (this.url === 'login') {
      this.pageTitle = 'Sing In';
      this.actionButtonText = 'SingIn';
    }
    if (this.url === 'signup') {
      this.pageTitle = 'Registrar Usuario';
      this.actionButtonText = 'signup';
    }
    if (this.url === 'reset') {
      this.pageTitle = 'Reset Password';
      this.actionButtonText = 'reset';
    }
    if (this.url === 'google')
    {
      this.pageTitle = 'Google Sing In';
      this.actionButtonText = 'googleSing';
    }
  }

  //  handleUserCredentials(userCredentials: { email: any; password: any }) {
  handleUserCredentials(userCredentials: any) {
    // This method gets the form value from the authentication component
    // And depending on the URL, it calls the respective method.
    const email = userCredentials.email;
    const password = userCredentials.password;

    switch (this.url) {
      case 'login':
        this.login(email, password);
        break;
      case 'signup':
        this.signup(userCredentials);
        break;
      case 'reset':
        this.resetPassword(email);
        break;
      case 'google':
        this.googleSign();
    }
  }

  async login(email: string, password: string) {
    try {
      await this.auth.login(email, password);
      sessionStorage.setItem('email', email);
      this.router.navigateByUrl('tabs');
    } catch (error) {
      this.userService.presentToast('Usuario o Password INVALIDO/INEXISTENTE');
    }
  }

  async signup(user: any) {
    console.log('User:', user);
    try {
      await this.auth.signup(user.email, user.password);
      //      this.photo = this.photoService.addNewToGallery();
      await this.userService.createUser(user as Usuario);
      this.router.navigateByUrl('');
    } catch (error) {
      this.userService.presentToast('Usuario YA Registrado');
      console.log('Error:', error);
    }
  }

  async resetPassword(email: string) {
    try {
      await this.auth.resetPassword(email);
      await this.userService.presentToast('Password RESETEADO');
      console.log('Email Sent');
      this.userService.presentToast('Se ha enviado un mensaje a: ' + email);
      this.router.navigateByUrl('login');
    } catch (error) {
      console.log('Error: ', error);
    }
  }
  async googleSign() {
    try {
    this.user = await this.auth.googleSingIn();
    sessionStorage.setItem('user', this.user.nombre);
    alert(sessionStorage.getItem('user'));
    await this.userService.createUser(this.user as Usuario);
    this.router.navigateByUrl('tabs');
    } catch (error) {
      this.userService.presentToast('Usuario NO DISPONIBLE');
      console.log('Error:', error);
    }
  }

}

