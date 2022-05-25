import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';

import { MenuOpt } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private fireStore: Firestore,
               private http: HttpClient ) { }

  getUsers() {
    const usersRef = collection( this.fireStore, 'users' );
    return collectionData(usersRef, { idField: 'id'});
  }
  
  getMenuOpt() {
    return this.http.get<MenuOpt[]>('/assets/data/menu-options.json');
  }
}
