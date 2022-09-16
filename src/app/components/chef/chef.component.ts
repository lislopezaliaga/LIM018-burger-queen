import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../servicios/pedido.service';
import Pedidos from '../../data/data.pedido';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {
  pedidos: Pedidos[];
 
  constructor(private pedidoService: PedidoService) { 
    this.pedidos= [{
      waiter: 'Mesero',
      client: 'TengoHambre',
      pedidos: [],
      timeShow: '',
      timeStart: '',
      timeEnd: '',
      status: '',
      totalPrice: ''
    }]
  }

  ngOnInit(): void {
    this.pedidoService.getPedido("pending").subscribe((pedidos) => {
      this.pedidos = pedidos;       
      console.log(this.pedidos);
    })
  }

  sendOrderReady(id:any){
    console.log(id);  
    this.pedidoService.updatePedido("ready", id, new Date);
  }

  
}
