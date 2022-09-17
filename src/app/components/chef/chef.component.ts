import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../servicios/pedido.service';
import Pedidos from '../../data/data.pedido';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {
  pedidos: Pedidos[];
  sesion:any=sessionStorage.getItem('User');
  user=JSON.parse(this.sesion);
  usuario:any=this.user.nombre;
  timeCook:any=new Date;
  tiempo:any;
 
  constructor(private pedidoService: PedidoService,private router: Router,
    private userService:UserService) { 
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
      this.pedidos=pedidos.sort((a:any,b:any)=>a.timeStart-b.timeStart);    
    })
    setTimeout(()=>{
      console.log(this.cronometro());
    },4000)
    
  }

  sendOrderReady(id:any){
    console.log(id);  
    this.pedidoService.updatePedido("ready", id, new Date);
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['login']);
    this.userService.signOutUser();
  }
 
  mueveReloj(){
    let momentoActual:any = new Date();
    let hora = momentoActual.getHours();
    let minuto = momentoActual.getMinutes();
    let segundo = momentoActual.getSeconds();
    this.tiempo = hora + " : " + minuto + " : " + segundo;
    return this.tiempo;
    
  }
  cronometro(){
    setInterval(this.mueveReloj,1000);
  }
}
