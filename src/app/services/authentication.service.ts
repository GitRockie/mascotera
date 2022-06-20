import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail,
         signInWithEmailAndPassword, signOut, User,
         UserCredential, deleteUser, GoogleAuthProvider, } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { GoogleAuth, } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private readonly auth: Auth, ) {}

  getUser(): User {
    return this.auth.currentUser;
  }

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
  async googleSingin(){
    const googleUser = (await GoogleAuth.signIn()) as any;
    console.log('Google User: ', googleUser);
    return googleUser;
  }

}
