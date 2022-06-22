import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
  signInWithRedirect,
  UserCredential,
  deleteUser,
} from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
//import { GoogleAuth,  GoogleAuthPlugin} from '@codetrix-studio/capacitor-google-auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly auTh: Auth,
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
    const auth = getAuth();let user: any = null;
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
         user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
//        this.userService.presentToast(error,'danger');
        console.log('Google:',user);
      });
      return user;
  }
}
