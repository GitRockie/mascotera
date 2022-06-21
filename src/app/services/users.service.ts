import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../models/interface';
import { ToastController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: Usuario[] = [];
  alert: any;
  constructor(
    private firestore: Firestore,
    private router: Router,
    private authService: AuthenticationService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  createUser(users: Usuario) {
    const userRef = collection(this.firestore, 'users');
    const user = addDoc(userRef, users);
    return user;
  }

  getUsers(): Observable<Usuario[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id' }) as Observable<Usuario[]>;
  }
  getUserById(id): Observable<Usuario> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<Usuario>;
  }
  deleteUser(users: Usuario) {
    const userDocRef = doc(this.firestore, `users/${users.id}`);
     if (confirm('Elimiar Usuario ?'))
    {
      try {
        deleteDoc(userDocRef);
//        this.presentToast('Usuario ELIMINADO');
      } catch (error) {
        this.presentToast(error);
      }
    }
  }

  updateUser(users: Usuario, userPhoto: string) {
    const userDocRef = doc(this.firestore, `users/${users.id}`);
    return updateDoc(userDocRef, {
      nombre: users.nombre,
      email: users.email,
      direccion: users.direccion,
      cp: users.cp,
      tlf: users.tlf,
      photo: userPhoto,
      obs: users.obs,
    });
  }

  async presentToast(msg: string, coLor?: any) {
    const mycolor = coLor;
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      color: mycolor ? mycolor : 'danger',
    });
    (await toast).present();
  }

  async presentAlertConfirm(msg: string, color?: any ) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: msg,
//      message: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel:');
          },
        },
        {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
          },
        },
      ],
    });
    await alert.present();
    console.log('Alert:', alert);
  }
}
