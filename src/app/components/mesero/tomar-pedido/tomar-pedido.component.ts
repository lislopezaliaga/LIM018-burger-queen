import { Component, OnInit } from '@angular/core';
import menu from '../../../../assets/menu.json';
@Component({
  selector: 'app-tomar-pedido',
  templateUrl: './tomar-pedido.component.html',
  styleUrls: ['./tomar-pedido.component.css']
})
export class TomarPedidoComponent implements OnInit {
  menus:any=menu;
  typeMenu:string='Menú';
  simpleDoble:boolean=false;
  constructor() { }

  ngOnInit(): void {

   
    console.log(this.menus);
  }
  breakfast(){
    // this.menus=menu;
    this.menus=menu.filter((element:any)=>element.type==="desayuno");
    this.typeMenu='Desayuno';
    this.simpleDoble=false;
    
  }
  hamburguer(){
    this.menus=menu.filter((element:any)=>element.type==="hamburguesa simple");
    this.typeMenu='Hamburguesas';
    this.simpleDoble=true;
  }
  bebidas(){
    this.menus=menu.filter((element:any)=>element.type==="bebidas");
    this.typeMenu='Bebidas';
    this.simpleDoble=false;
  }
  burguerSimple(){
    this.menus=menu.filter((element:any)=>element.type==="hamburguesa simple");
    this.typeMenu='Hamburguesas';
    this.simpleDoble=true;
  }
  burguerDoble(){
    this.menus=menu.filter((element:any)=>element.type==="hamburguesa doble");
    this.typeMenu='Hamburguesas';
    this.simpleDoble=true;
  }


  acompa(){
  this.menus=menu.filter((element:any)=>element.type==="acompañamientos");
  this.typeMenu='Acompañamientos';
  this.simpleDoble=false;
}

}
