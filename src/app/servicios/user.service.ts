import { EventEmitter, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, deleteUser} from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, setDoc, getDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Users from '../data/data.users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth,
    private firestore: Firestore) { }
    
    register ({ email, password }: any){
      return createUserWithEmailAndPassword(this.auth, email, password)
    }
  
  login({email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  $register = new EventEmitter<any>();

  // addUser(user: Users){
  //   const userRef = collection(this.firestore, 'users');
  //   return addDoc(userRef, user);
  // }
  addUser(user: Users,userId:any){
    const userRef = doc(this.firestore, 'users',userId);
    return setDoc(userRef, user);
  }

  getUser(): Observable<Users[]>{
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id'}) as Observable<Users[]>
  }

  deleteRegistro(user: Users) {
    const userRef  = doc(this.firestore, `users/${user.id}`);
    return deleteDoc(userRef );
  }
  
  getUserById = (userId:any) => {
    const docRef = doc(this.firestore, 'users', userId);
    const docSnap = getDoc(docRef).then((userDoc) => userDoc.data());
    return docSnap;
  };
  /*   deleteUsuario(user: Users){
    return deleteUser(user.uid);
  } */

}
