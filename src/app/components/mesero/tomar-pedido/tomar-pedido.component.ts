import { Component, OnInit } from '@angular/core';
import menu from '../../../../assets/menu.json';
@Component({
  selector: 'app-tomar-pedido',
  templateUrl: './tomar-pedido.component.html',
  styleUrls: ['./tomar-pedido.component.css']
})
export class TomarPedidoComponent implements OnInit {
  menus:any=menu;
  constructor() { }

  ngOnInit(): void {
  
    
  }


}
