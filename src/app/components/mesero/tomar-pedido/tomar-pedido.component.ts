import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { elementAt } from 'rxjs';
import menu from '../../../../assets/menu.json';
import { FormControl } from '@angular/forms';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-tomar-pedido',
  templateUrl: './tomar-pedido.component.html',
  styleUrls: ['./tomar-pedido.component.css'],
})
export class TomarPedidoComponent implements AfterViewInit {
  @ViewChildren('eggSelected') eSelected!: QueryList<ElementRef>;
  @ViewChildren('cheeseSelected') cSelected!: QueryList<ElementRef>;

  sesion: any = sessionStorage.getItem('User');
  user = JSON.parse(this.sesion);
  usuario: any = this.user.nombre;
  date: any = this.dateTime();
  menus: any = menu;
  typeMenu: string = 'Menú';
  simpleDoble: boolean = false;
  selectSimple: boolean = true;
  selectDoble: boolean = false;
  pedido: any = [];
  contador: number = 1;
  total: any = 0;
  selectPedidos: any = 0;
  orderEmpty: boolean = false;

  cliente = new FormControl('', []);
  egg: any = 0;
  cheese: any = 0;
  eggName: any = '';
  cheeseName: any = '';
  takeOrder: any = {};

  constructor(private pedidoService: PedidoService) {
    // const a:any=this.pedido.forEach((element:any)=>this.total+=element.precio)
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    /*  this.eSelected.forEach((e,i)=>i==0?console.log(e.nativeElement.value):console.log('hola')); */
  }

  filterMenu(types: string) {
    // this.menus=menu;
    if (types == 'Hamburguesa simple') {
      this.selectSimple = true;
      this.selectDoble = false;
    } else {
      this.selectSimple = false;
      this.selectDoble = true;
    }
    if (types == 'Hamburguesa simple' || types == 'Hamburguesa doble') {
      this.typeMenu = 'Hamburguesa';
      this.simpleDoble = true;
    } else {
      this.typeMenu = types;
      this.simpleDoble = false;
    }
    this.menus = menu.filter((element: any) => element.type === types);
  }

  addNombre(inde: number, name: string, price: any, cantItems: number) {
    name = name + this.eggName + this.cheeseName;

    price = price + parseInt(this.egg) + parseInt(this.cheese);

    let prueb: boolean = this.pedido.filter((element: any, indice: any) => {
      if (element.descripcion == name) {
        this.pedido[indice].cantidad += 1;
        this.pedido[indice].precio += parseInt(price);

        return true;
      }
      return false;
    });
    if (prueb == false) {
      this.pedido.push({
        descripcion: name,
        precio: price,
        cantidad: cantItems,
      });
    }
    this.egg = 0;
    this.cheese = 0;
    this.eggName = '';
    this.cheeseName = '';

    this.eSelected.filter((e, i) =>
      i == inde ? (e.nativeElement.value = '0') : e.nativeElement.value
    );
    this.cSelected.filter((e, i) =>
      i == inde ? (e.nativeElement.value = '0') : e.nativeElement.value
    ); // Aquí igualas al value del ítem que quieras
  }

  addItems(name: any, precio: any) {
    return this.pedido.map((element: any) => {
      if (element.descripcion === name) {
        element.cantidad += 1;

        element.precio = (precio / (element.cantidad - 1)) * element.cantidad;
      }
    });
  }

  removeItems(name: any, precio: any) {
    this.pedido.map((element: any) => {
      if (element.descripcion === name) {
        element.cantidad -= 1;
        element.precio = (precio / (element.cantidad + 1)) * element.cantidad;
      }
    });

    this.pedido.forEach((element: any) => {
      if (element.cantidad == 0) {
        this.deleteItems(element.descripcion);
      }
    });
    return this.pedido;
  }

  deleteItems(name: string) {
    this.pedido = this.pedido.filter(
      (element: any) => element.descripcion !== name
    );
  }

  precioTotal() {
    const prices: any = [];
    this.pedido.forEach((e: any) => {
      return prices.push(e.precio);
    });
    const result = prices.reduce((acc: any, item: any) => acc + item, 0);
    return (this.total = result);
  }

  dateTime() {
    const datePost: any = {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    };
    const timePost: any = {
      hour12: 'true',
      hour: 'numeric',
      minute: 'numeric',
    };

    const date = new Date().toLocaleDateString('es-Es', datePost);
    const time = new Date().toLocaleTimeString('es-Es', timePost);
    const dateTime1 = `${date} ${time}`;

    return dateTime1;
  }

  addEgg(event: any) {
    this.eggName = ' +' + event.target.value + '🍳 ';
    this.egg = event.target.value;
  }
  addCheese(event: any) {
    this.cheeseName = ` +` + event.target.value + '🧀';
    this.cheese = event.target.value;
  }

  sendOrder() {
    this.takeOrder = {
      waiter: this.usuario,
      client: this.cliente.value,
      pedidos: this.pedido,
      timeShow: this.date,
      timeStart: new Date(),
      timeEnd: '',
      status: 'pending',
      totalPrice: this.total,
    };

    if (this.pedido.length > 0 && this.cliente.value !== '') {
      this.pedidoService.addPedido(this.takeOrder);
      this.pedido = [];
      this.cliente = new FormControl('', []);
    } else {
      this.orderEmpty = true;
      setTimeout(() => {
        this.orderEmpty = false;
      }, 3000);
    }
  }
}
