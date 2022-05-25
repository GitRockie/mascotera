import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { MenuOpt, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private fireStore: Firestore,
               private http: HttpClient ) { }

  getUsers(): Observable<User[]> {
    const usersRef = collection( this.fireStore, 'users' );
    return collectionData(usersRef, { idField: 'id'}) as  Observable<User[]>;
  }

  getUserById( id ): Observable<User> {
    const userDocRef = doc( this.fireStore, `users/${ id }` );
    return docData(userDocRef, { idField: 'id'}) as  Observable<User>;
  }

  addUser ( user: User ){
    const usersRef = collection( this.fireStore, 'users');
    return addDoc( usersRef, user );
  }

  deleteUser ( user: User ){
    const userDocRef = doc( this.fireStore, `users/${ user.id }`);
    return deleteDoc( userDocRef );
  }

  
  updateUser ( user: User ){
    const userDocRef = doc( this.fireStore, `users/${ user.id }`);
    return updateDoc( userDocRef, { name: user.name, address: user.address } );
  }
  
  getMenuOpt() {
    return this.http.get<MenuOpt[]>('/assets/data/menu-options.json');
  }
}
