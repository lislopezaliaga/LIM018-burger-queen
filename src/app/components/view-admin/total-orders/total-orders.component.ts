import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../servicios/pedido.service';
import Pedidos from '../../../data/data.pedido';

@Component({
  selector: 'app-total-orders',
  templateUrl: './total-orders.component.html',
  styleUrls: ['./total-orders.component.css']
})
export class TotalOrdersComponent implements OnInit {

  pedidos: Pedidos[];
 
  constructor(private pedidoService: PedidoService) { 
    this.pedidos= [{
      waiter: 'Mesero',
      client: 'TengoHambre',
      pedidos: [],
      timeShow: '',
      timeStart: '',
      timeEnd: 'cocinero',
      status: 'cocinero',
      totalPrice: 'cocinero'
    }]
  }

  ngOnInit(): void {
    this.pedidoService.getOrderTotal().subscribe((pedidos) => {
      this.pedidos = pedidos;       
      console.log(this.pedidos);
    })
  }

}
