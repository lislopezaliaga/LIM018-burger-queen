import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../servicios/pedido.service';
import Pedidos from '../../../data/data.pedido';

@Component({
  selector: 'app-order-ready',
  templateUrl: './order-ready.component.html',
  styleUrls: ['./order-ready.component.css'],
})
export class OrderReadyComponent implements OnInit {
  pedidos: Pedidos[];

  constructor(private pedidoService: PedidoService) {
    this.pedidos = [
      {
        waiter: 'Mesero',
        client: 'TengoHambre',
        pedidos: [],
        timeShow: '',
        timeStart: '',
        timeEnd: 'cocinero',
        status: 'cocinero',
        totalPrice: 'cocinero',
      },
    ];
  }

  ngOnInit(): void {
    this.pedidoService.getPedido('ready').subscribe(pedidos => {
      this.pedidos = pedidos.sort((a: any, b: any) => a.timeEnd - b.timeEnd);
    });
  }

  sendOrderDelivered(id: any, timeend: any) {
    this.pedidoService.updatePedido('delivered', id, timeend);
  }
}
