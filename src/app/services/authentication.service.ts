import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
//import { GoogleAuth,  GoogleAuthPlugin} from '@codetrix-studio/capacitor-google-auth';
import { getAuth, signInWithPopup, getRedirectResult, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth, } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
    constructor(
      private readonly auTh: Auth,
      private fireAuth: AngularFireAuth,
      public afs: AngularFirestore, // Inject Firestore service
      public afAuth: AngularFireAuth, // Inject Firebase auth service
      public router: Router,
    ) {}

  getUser(): User {
    return this.auTh.currentUser;
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auTh, email, password);
  }

  signup(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auTh, email, password);
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auTh, email);
  }

  async googleSingIn() {
      return this.authLogin(new auth.GoogleAuthProvider())
      .then((res: any) => {
        if (res) {
          console.log('Res:',res);
        }
        return res.user;
      });
    }
   // Auth logic to run auth providers
  async authLogin(provider: any) {
    try {
      const result = await this.afAuth
        .signInWithPopup(provider);
        console.log('Result:',result);
      return result;
    } catch (error) {
      window.alert(error);
    }
  }
}
