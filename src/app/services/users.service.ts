import { Injectable } from '@angular/core';
//import { AngularFirestore, } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, FirebaseStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Usuario } from '../models/interface';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { user } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: Usuario[] = [];
  constructor(
    private firestore: Firestore,
    private router: Router,
    private toastCtrl: ToastController,
  ) { }

/*
  createUser(user: Usuario) {
    const id = this.firestore.createId() as string;
    user.id = id;
    return this.firestore.collection('users').add(user);
  }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
*/
  createUser(users: Usuario) {
  const userRef = collection(this.firestore, 'users');
  return addDoc(userRef, users);
}

  getUsers(): Observable<Usuario[]> {
    const userRef = collection(this.firestore,'users');
    return collectionData(userRef, { idField: 'id'}) as Observable<Usuario[]>;
  }
  getUserById(id): Observable<Usuario> {
    const noteDocRef = doc(this.firestore, `users/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Usuario>;
  }
  deleteUser(users: Usuario) {
    const userDocRef = doc(this.firestore, `users/${users.id}`);
    return deleteDoc(userDocRef);
  }

  updateUser(users: Usuario) {
    const userDocRef = doc(this.firestore, `notes/${users.id}`);
    return updateDoc(userDocRef, {
      email: users.email,
      nombre: users.direccion,
      direccion: users.direccion,
      cp: users.cp,
      tlf: users.tlf,
      obs: users.obs,
    });
  }

/*
  getUser(id) {
    return this.firestore.collection('users').doc(id).valueChanges();
  }

  getUserDoc(id) {
    return this.firestore
      .collection('users')
      .doc(id)
      .valueChanges();
  }

  updateUser(id, user: Usuario) {
    this.firestore.collection('users').doc(id).update(user)
      .then(() => {
        this.router.navigate(['/tabs/tab3']);
      }).catch(error => console.log(error));;
  }

  delete(id: string) {
    alert(id);
    this.firestore.doc('users/' + id).delete();
  }
*/
  async presentToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      color: 'danger',
    });
    (await toast).present();
  }

}
