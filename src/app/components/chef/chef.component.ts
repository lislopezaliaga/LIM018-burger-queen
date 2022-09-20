import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren,AfterViewInit } from '@angular/core';
import { PedidoService } from '../../servicios/pedido.service';
import Pedidos from '../../data/data.pedido';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';
import { Time } from '@angular/common';
import { timeout } from 'rxjs';


@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements AfterViewInit {
  // @ViewChild('timeEnd')timeEnd!:ElementRef;
  @ViewChildren('timeEnd') timeEnd!:QueryList<ElementRef>;
  

  pedidos: Pedidos[];
  sesion:any=sessionStorage.getItem('User');
  user=JSON.parse(this.sesion);
  usuario:any=this.user.nombre;
  timeCook:any;
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
  
      console.log(this.timeEnd);
      
    setInterval((this.mueveReloj),1000);
  
    
  }
  
  ngAfterViewInit ():void{
    // setTimeout(()=>{
    //   this.timeEnd.forEach((e)=> console.log( e.nativeElement));
    // },2000)
     
  }


  sendOrderReady(id:any,i:any){
    
    this.timeEnd.forEach((e,index)=> index==i?this.timeCook =e.nativeElement.textContent:0 );
    this.pedidoService.updatePedido("ready", id, this.timeCook);
    // console.log(this.timeCook);
  
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['login']);
    this.userService.signOutUser();
  }
 
  mueveReloj(timeS:any){
    // timeS= timeS.seconds;
    // console.log(timeS);-timeS;
    
    let momentoActual:any = new Date();
    let seg=(Date.parse(momentoActual)*0.001)-timeS;

    let hour:any = Math.floor(seg / 3600);
      hour = (hour < 10)? '0' + hour : hour;
    let minute:any = Math.floor((seg / 60) % 60);
      minute = (minute < 10)? '0' + minute : minute;
    let second:any = seg % 60;
      second = (second < 10)? '0' + second : second;
    this.tiempo=hour + ':' + minute + ':' + second;
    return this.tiempo
  }
}
