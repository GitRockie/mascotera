import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail,
         signInWithEmailAndPassword, signOut, User,
         UserCredential, deleteUser, } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private readonly auth: Auth) {}

  getUser(): User {
    return this.auth.currentUser;
  }
/*
  getUserList(){
    const admin = require('firebase-admin');
    const serviceAccount = require('./serviceAccountKey.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://mascotas-d4066.firebaseio.com',
    });

    admin.auth().listUsers().then(data=>{
        console.log(data.users);
    });
  };
  */

  getUser$(): Observable<User> {
    return of(this.getUser());
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signup(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
