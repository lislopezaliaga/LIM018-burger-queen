import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc} from '@angular/fire/firestore';
import Pedidos from '../data/data.pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private firestore: Firestore) { }

  addPedido(register: Pedidos){
    const pedidoRef = collection(this.firestore, 'pedidos');
    return addDoc(pedidoRef, register);
  }

  getPedido(): Observable<Pedidos[]>{
    const pedidoRef = collection(this.firestore, 'pedidos');
    return collectionData(pedidoRef, { idField: 'id'}) as Observable<Pedidos[]>
  }
  
}
