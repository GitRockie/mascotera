import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, deleteDoc, Firestore} from '@angular/fire/firestore';
import { AuthenticationService } from '../services/authentication.service';
import { Usuario } from '../models/interface';
import { map, switchMap } from 'rxjs/operators';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: Usuario;
  constructor(
    private readonly auth: AuthenticationService,
    private readonly firestore: Firestore


  ) {}

  createUser(usuario: Partial<Usuario>) {
    const userId: string = this.auth.getUser().uid;
    const userCollection = collection(
      this.firestore,`users`);
    return addDoc(userCollection, usuario);
  }

  getUserList() {
    return this.auth.getUser$().pipe(
      map(({ uid: userId }: User) =>
        collection(this.firestore, `users`)
      ),
      switchMap((userCollection) =>
        collectionData(userCollection, { idField: 'id' })
      )
    );
  }

  getUserDetail(usuarioId: string) {
    return this.auth.getUser$().pipe(
      map(({ uid: userId }: User) =>
        doc(this.firestore, `users}`)
      ),
      switchMap((userDocument) => docData(userDocument))
    );
  }

  deleteUser(usuario: string): Promise<void> {
    const userId: string = this.auth.getUser().uid;
    const documentReference = doc(
      this.firestore,
      `users`
    );
    return deleteDoc(documentReference);
  }
}
