import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private fireStore: Firestore ) { }

  getNotes() {
    const notesRef = collection( this.fireStore, 'notes' );
    return collectionData(notesRef);
  }
}
