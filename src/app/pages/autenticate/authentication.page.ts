import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { UserService } from 'src/app/services/users.service';
import { Usuario } from 'src/app/models/interface';

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

  constructor(
    private readonly router: Router,
    private readonly auth: AuthenticationService,
    private userService: UserService,
  ) {}


  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit(): void {
    // First we get the URL, and with that URL we send the
    // proper information to the authentication form component.
    // this.url = this.router.url.substr(1);
    this.url = this.router.url.substring(1);
    console.log('url:', this.url);
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
        console.log('Sign Up');
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
//      this.router.navigate(['tabs']);

    } catch (error) {
      console.log(
        `Either we couldn't find your user or there was a problem with the password`
      );
    }
  }

//  async signup(email: string, password: string) {
//  async signup(user: Usuario , email: any, password: any ) {
async signup(user: any) {
    console.log('User:', user);
    try {
      await this.auth.signup(user.email, user.password);
//      this.takePhoto();
//      const uSer: Usuario = user;
      this.userService.createUser(user as Usuario);
      this.router.navigateByUrl('');
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async resetPassword(email: string) {
    try {
      await this.auth.resetPassword(email);
      console.log('Email Sent');
      this.router.navigateByUrl('login');
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async takePhoto() {
    const options = {
      resultType: CameraResultType.Uri,
    };
    const originalPhoto = await Camera.getPhoto(options);
    const photoInTempStorage = await Filesystem.readFile({
      path: originalPhoto.path,
    });
    const date = new Date();
    const time = date.getTime();
    const fileName = time + '.jpeg';
    await Filesystem.writeFile({
      data: photoInTempStorage.data,
      path: fileName,
      directory: Directory.Data,
    });
    const finalPhotoUri = await Filesystem.getUri({
      directory: Directory.Data,
      path: fileName,
    });
    const photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri);
    console.log(photoPath);
  }
}
