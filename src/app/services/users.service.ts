import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../models/interface';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: Usuario[] = [];
  constructor(
    private firestore: Firestore,
    private router: Router,
    private authService: AuthenticationService,
    private toastCtrl: ToastController,
  ) { }

  createUser(users: Usuario) {
    if (!users.photo)
    {
      users.photo = '';
    }
  const userRef = collection(this.firestore, 'users');
  return addDoc(userRef, users);
}

  getUsers(): Observable<Usuario[]> {
    const userRef = collection(this.firestore,'users');
    return collectionData(userRef, { idField: 'id'}) as Observable<Usuario[]>;
  }
  getUserById(id): Observable<Usuario> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<Usuario>;
  }
  deleteUser(users: Usuario) {
    const userDocRef = doc(this.firestore, `users/${users.id}`);
//    return deleteDoc(userDocRef);
    try {
      deleteDoc(userDocRef);
      this.presentToast('Usuario ELIMINADO');
    }
    catch(error) {
      this.presentToast(error);
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

  async presentToast(msg: string, coLor?: any | null) {
    const mycolor = coLor;
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      color: mycolor ? mycolor : 'danger',
    });
    (await toast).present();
  }

}
