import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  orderBy,
  query,
  where,
  updateDoc,
  doc,
} from '@angular/fire/firestore';
import Pedidos from '../data/data.pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(private firestore: Firestore) {}

  addPedido(order: Pedidos) {
    const pedidoRef = collection(this.firestore, 'pedidos');
    return addDoc(pedidoRef, order);
  }

  getPedido(status: any): Observable<Pedidos[]> {
    const pedidoRef = query(
      collection(this.firestore, 'pedidos'),
      where('status', '==', status)
    );
    return collectionData(pedidoRef, { idField: 'id' }) as Observable<
      Pedidos[]
    >;
  }

  getOrderTotal(): Observable<Pedidos[]> {
    const pedidoRef = query(
      collection(this.firestore, 'pedidos'),
      orderBy('timeStart', 'asc')
    );
    return collectionData(pedidoRef, { idField: 'id' }) as Observable<
      Pedidos[]
    >;
  }

  //, orderBy("timeStart", "asc")

  updatePedido(newStatus: any, id: any, dateEnd?: any) {
    const pedidoRef = updateDoc(doc(this.firestore, 'pedidos', id), {
      status: newStatus,
      timeEnd: dateEnd,
    });
    return pedidoRef;
  }
}
