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

  getNotes() {
    const notesRef = collection( this.fireStore, 'notes' );
    return collectionData(notesRef);
  }
  
  getMenuOpt() {
    return this.http.get<MenuOpt[]>('/assets/data/menu-options.json');
  }
}
