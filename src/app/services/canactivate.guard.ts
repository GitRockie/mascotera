import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly auth: Auth, private readonly router: Router) {}

  canActivate(): Promise<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user && (sessionStorage.getItem('email').length > 0
        || sessionStorage.getItem('user').length > 0)) {
          resolve(true);
        } else {
          reject('Usuario NO LOGUEADO');
          this.router.navigateByUrl('/login');
        }
      });
    });
  }
}
