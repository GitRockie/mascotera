import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from 'src/app/services/users.service';
import { Usuario, UserPhoto } from 'src/app/models/interface';
import { PhotoService } from 'src/app/services/photo.service';




@Injectable({
  providedIn: 'root'
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

  constructor(
    private readonly router: Router,
    private readonly auth: AuthenticationService,
    private photoService: PhotoService,
    private userService: UserService,
  ) {}


  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit(): void {
    // First we get the URL, and with that URL we send the
    // proper information to the authentication form component.
    // this.url = this.router.url.substr(1);
    this.url = this.router.url.substring(1);
//    console.log('url:', this.url);
    if (this.url === 'signup') {
      this.pageTitle = 'Registrar Usuario';
      this.actionButtonText = 'Registro';
    }
    if (this.url === 'reset') {
      this.pageTitle = 'Reset your Password';
      this.actionButtonText = 'Reset Password';
    }
  }

//  handleUserCredentials(userCredentials: { email: any; password: any }) {
  handleUserCredentials(userCredentials: any ) {
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
    }
  }

  async login(email: string, password: string) {
    try {
      await this.auth.login(email, password);
      sessionStorage.setItem('email',email);
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
      this.router.navigateByUrl('login');
    } catch (error) {
      console.log('Error: ', error);
    }
  }


}
