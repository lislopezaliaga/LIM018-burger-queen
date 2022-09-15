import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import menu from '../../../../assets/menu.json';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-tomar-pedido',
  templateUrl: './tomar-pedido.component.html',
  styleUrls: ['./tomar-pedido.component.css']
})
export class TomarPedidoComponent implements OnInit {
  menus:any=menu;
  typeMenu:string='Menú';
  simpleDoble:boolean=false;
  pedido:any=[];
  contador:number=1;
  total:any=0;
  select:any;
  
  
  cliente = new FormControl('', []);
  egg:any=0;
  cheese:any=0;
  eggName:any='';


  constructor() {
    // const a:any=this.pedido.forEach((element:any)=>this.total+=element.precio)
    
   }

  ngOnInit(): void {
  
   

  }
  // capturar(){
  //   this.addCheese
    
  // }

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

addNombre(name:string, price:string,cantItems:number){

  let prueb:boolean=this.pedido.filter((element:any, indice:any) => {
    if(element.descripcion===name){
      this.pedido[indice].cantidad+=1;
      this.pedido[indice].precio+=parseInt(price);
      this.select="0";
      return true
    }
    return false;
    })
  if(prueb==false){
   this.pedido.push({descripcion:name+this.eggName, precio:price,cantidad:cantItems,egg:this.egg,cheese:this.cheese}); 
   this.eggName='';
   this.select="0";
  //  <HTMLSelectElement>.reset();
  // Option.select=false
  }


  // if(this.pedido.length===0){
  //   this.pedido.push({descripcion:name, precio:price,cantidad:cantItems}); 
  // }else{
  //   return this.pedido.map((element:any,i:any,ar:any)=>{
  //     if(element.descripcion==name){
  //      return element.cantidad+=1;
  //     }else {
  //      ar.push({descripcion:name, precio:price,cantidad:cantItems});
  //     }
  //   })
  // }
  // console.log(this.pedido);
  
  // return this.pedido.map((element:any)=>{
  // if(element.descripcion==name){
  //   element.cantidad+=1;
  // }
  // })

}

addItems(name:any,precio:any){
  console.log(name,precio);
  
  return this.pedido.map((element:any) => {
    if(element.descripcion===name){
      element.cantidad+=1;
  
       element.precio=precio/(element.cantidad-1)*element.cantidad;
    }
    
  }

)}

removeItems(name:any, precio:any){

  this.pedido.map((element:any)=>{
  
    if(element.descripcion===name){
      element.cantidad-=1;
      element.precio=precio/(element.cantidad+1)*element.cantidad;
    }
  })

  
  this.pedido.forEach((element:any)=>{
    if(element.cantidad==0){
    this.deleteItems(element.descripcion)
    };
  })
  return this.pedido
}

  deleteItems(name:string){
    this.pedido=this.pedido.filter((element:any)=>element.descripcion!==name);
  }

  precioTotal(){
    // console.log(this.addCheese,this.addEgg);
 
    const prices:any = []
    this.pedido.forEach((e :any)=> {
      return prices.push(e.precio);
    })
    const result = prices.reduce((acc:any, item:any) => acc + item, 0)
    return this.total = result

  }
  addCheese(event:any){
    
    this.cheese= event.target.value;
  //  event.target.value=this.select;
    
  }
  addEgg(event:any){
    this.eggName=event.target.value+'c/h'
    this.egg=event.target.value;
  // this.select=event.target.value;

  }


}
