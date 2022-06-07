import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../models/interface';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private toastCtrl: ToastController,
  ) { }

  createUser(user: Usuario) {
    const id = this.firestore.createId() as string;
    user.id = id;
    return this.firestore.collection('users').add(user);
  }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
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
