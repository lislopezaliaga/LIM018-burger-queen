import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc} from '@angular/fire/firestore';
import Pedido from '../data/data.users';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private firestore: Firestore) { }

  addPedido(register: Pedido){
    const pedidoRef = collection(this.firestore, 'pedidos');
    return addDoc(pedidoRef, register);
  }
}
