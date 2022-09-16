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
      timeEnd: 'cocinero',
      status: 'cocinero',
      totalPrice: 'cocinero'
    }]
  }

  ngOnInit(): void {
    this.pedidoService.getPedido().subscribe((pedidos) => {
      this.pedidos = pedidos;       
      console.log(this.pedidos);
    })
  }
  
/*   dateTime(dateStart:any){
    dateStart= dateStart.toString();
    const datePost:any = {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    };
    const timePost:any = {
      hour12: 'true',
      hour: 'numeric',
      minute: 'numeric',
    };
  
    const date = dateStart.toLocaleDateString('es-Es', datePost);
    const time = dateStart.toLocaleTimeString('es-Es', timePost);
    const dateTime1 = `${date} ${time}`;
  
    return dateTime1;
  }; */



}
