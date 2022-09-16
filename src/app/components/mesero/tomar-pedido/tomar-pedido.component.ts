import { Component, OnInit,Input } from '@angular/core';
import { elementAt } from 'rxjs';
import menu from '../../../../assets/menu.json';
import { FormControl } from '@angular/forms';
import { PedidoService } from 'src/app/servicios/pedido.service';


@Component({
  selector: 'app-tomar-pedido',
  templateUrl: './tomar-pedido.component.html',
  styleUrls: ['./tomar-pedido.component.css']
})
export class TomarPedidoComponent implements OnInit {
  // @ViewChild('hola') element: ElementRef;
  // @Input() nameuser:any;
  sesion:any=sessionStorage.getItem('User');
  user=JSON.parse(this.sesion);
  usuario:any=this.user.nombre;
  date:any=this.dateTime();
  menus:any=menu;
  typeMenu:string='Menú';
  simpleDoble:boolean=false;
  selectSimple:boolean=true;
  selectDoble:boolean=false;
  pedido:any=[];
  contador:number=1;
  total:any=0;
  select:any=0;

  
  cliente = new FormControl('', []);
  egg:any=0;
  cheese:any=0;
  eggName:any='';
  cheeseName:any='';
  takeOrder:any={};

  constructor(private pedidoService:PedidoService) {
    // const a:any=this.pedido.forEach((element:any)=>this.total+=element.precio)
    
   }

  ngOnInit(): void {

 
   
  }
  // capturar(){
  //   this.addCheese
    
  // }

  filterMenu(types:string){
    // this.menus=menu;
    if(types=="Hamburguesa simple"){
      this.selectSimple=true;
      this.selectDoble=false;
    }else{
      this.selectSimple=false;
      this.selectDoble=true;
    }
    if(types=="Hamburguesa simple"||types=="Hamburguesa doble"){
      this.typeMenu="Hamburguesa";
      this.simpleDoble=true;
    }else{
      this.typeMenu=types;
      this.simpleDoble=false;
  
    }
    this.menus=menu.filter((element:any)=>element.type===types);
  
  }


  addNombre(id:any,name:string, price:string,cantItems:number){
    console.log(id);
    name=name+this.eggName+this.cheeseName;
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
   
    this.pedido.push({descripcion:name, precio:price,cantidad:cantItems,egg:this.egg,cheese:this.cheese}); 
   
    }
    this.eggName='';
    this.cheeseName='';
    this.select=0;
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
 

  dateTime(){
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
  
    const date = new Date().toLocaleDateString('es-Es', datePost);
    const time = new Date().toLocaleTimeString('es-Es', timePost);
    const dateTime1 = `${date} ${time}`;
  
    return dateTime1;
  };
    
  addEgg(event:any){
    this.eggName=event.target.value+'h '
    this.egg=event.target.value;

  }
  addCheese(event:any){
    
    this.cheeseName= event.target.value + 'q';
    this.cheese=event.target.value;

  }
 
  sendOrder(){
    this.takeOrder={
      waiter:this.usuario,
      client: this.cliente.value,
      pedidos: this.pedido,
      timeShow: this.date,
      timeStart: new Date,
      timeEnd:'',
      status:'pending',
      totalPrice:this.total
    };
    console.log(this.takeOrder);
    this.pedidoService.addPedido(this.takeOrder)
  }


}
