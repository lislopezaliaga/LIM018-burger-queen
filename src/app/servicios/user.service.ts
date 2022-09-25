import { EventEmitter, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  deleteUser,
  signOut,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
  enableIndexedDbPersistence,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Users from '../data/data.users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //   import { enableIndexedDbPersistence } from "firebase/firestore";

  constructor(private auth: Auth, private firestore: Firestore) {
    enableIndexedDbPersistence(this.firestore).catch(err => {
      if (err.code == 'failed-precondition') {
        console.log('hhhhhh', err.code);

        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code == 'unimplemented') {
        console.log('hhhhhhhhh', err.code);
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  signOutUser() {
    return signOut(this.auth);
  }

  $register = new EventEmitter<any>();

  addUser(user: Users, userId: any) {
    const userRef = doc(this.firestore, 'users', userId);
    return setDoc(userRef, user);
  }

  getUser(): Observable<Users[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id' }) as Observable<Users[]>;
  }

  deleteRegistro(user: Users) {
    const userRef = doc(this.firestore, `users/${user.id}`);
    return deleteDoc(userRef);
  }

  getUserById(userId: any) {
    const docRef = doc(this.firestore, 'users', userId);
    const docSnap = getDoc(docRef).then(userDoc => userDoc.data());
    return docSnap;
  }
  /*   deleteUsuario(user: Users){
    return deleteUser(user.uid);
  } */
}
