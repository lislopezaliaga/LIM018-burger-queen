import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';

import { TomarPedidoComponent } from './tomar-pedido.component';
import { PedidoService } from 'src/app/servicios/pedido.service';

describe('TomarPedidoComponent', () => {
  let component: TomarPedidoComponent;
  let fixture: ComponentFixture<TomarPedidoComponent>;
  let order;
  let selectEgg: any;
  let selectCheese: any;
  let pedidoServiceSpy: jasmine.SpyObj<PedidoService>;

  beforeEach(async () => {
    pedidoServiceSpy = jasmine.createSpyObj<PedidoService>('PedidoService', [
      'addPedido',
    ]);

    await TestBed.configureTestingModule({
      declarations: [TomarPedidoComponent],
      providers: [{ provide: PedidoService, useValue: pedidoServiceSpy }],
    }).compileComponents();

    sessionStorage.setItem(
      'User',
      '{"uid":"AextYYpYUrghueil3WbfCfBN0p93","nombre":"Miguel"}'
    );

    fixture = TestBed.createComponent(TomarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    selectEgg = fixture.nativeElement.querySelector('#egg');
    selectCheese = fixture.nativeElement.querySelector('#cheese');
    order = [
      {
        descripcion: 'cafe',
        precio: 5,
        cantidad: 1,
      },
      {
        descripcion: 'jugo',
        precio: 6,
        cantidad: 1,
      },
      {
        descripcion: 'leche',
        precio: 7,
        cantidad: 2,
      },
    ];
    component.pedido = order;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filterMenu Hamburguesa simple', () => {
    component.filterMenu('Hamburguesa simple');
    expect(component.selectSimple).toBeTruthy();
    expect(component.selectDoble).toBeFalsy();
  });

  it('filterMenu Hamburguesa doble', () => {
    component.filterMenu('Hamburguesa doble');
    expect(component.selectSimple).toBeFalsy();
    expect(component.selectDoble).toBeTruthy();
  });

  it('filterMenu desayuno', () => {
    component.filterMenu('Desayuno');
    expect(component.typeMenu).toBe('Desayuno');
    expect(component.simpleDoble).toBeFalsy();
  });

  it('deleteItems', () => {
    component.deleteItems('cafe');
    expect(component.pedido.length).toBe(2);
  });

  it('addItems', () => {
    component.addItems('cafe', 5);
    expect(component.pedido[0].cantidad).toBe(2);
    expect(component.pedido[0].precio).toBe(10);
  });

  it('addPedido exist product', () => {
    component.addNombre(0, 'jugo', 6, 1);

    expect(component.pedido[1].cantidad).toBe(2);
    expect(component.pedido[1].precio).toBe(12);
  });
  it('addPedido no exist product', () => {
    component.addNombre(0, 'torta', 6, 1);
    expect(component.pedido.length).toBe(4);
  });

  it('removeItems', () => {
    component.removeItems('leche', 14);
    expect(component.pedido[2].cantidad).toBe(1);
    expect(component.pedido[2].precio).toBe(7);
  });

  it('removeItems', () => {
    component.removeItems('jugo', 6);
    expect(component.pedido.length).toBe(2);
  });

  it('precioTotal', () => {
    component.precioTotal();
    expect(component.total).toBe(18);
  });

  it('addEgg', () => {
    selectEgg.value = '2';
    selectEgg.dispatchEvent(new Event('change'));
    expect(component.egg).toBe('2');
  });
  it('addCheese', () => {
    selectCheese.value = '2';
    selectCheese.dispatchEvent(new Event('change'));
    expect(component.cheese).toBe('2');
  });

  it(' sendOrder() if', fakeAsync(() => {
    let takeOrder: any = {
      waiter: '',
      client: '',
      pedidos: '',
      timeShow: '',
      timeStart: '',
      timeEnd: '',
      status: '',
      totalPrice: 0,
    };
    let order: any = [
      {
        descripción: 'cafe',
      },
    ];

    pedidoServiceSpy.addPedido.and.callFake(() => Promise.resolve(takeOrder));
    component.cliente.setValue('Gaby');
    component.pedido = order;
    component.sendOrder();
    tick();
    fixture.detectChanges();
    expect(component.pedido.length).toBe(0);
    expect(component.cliente.value).toBe('');
    flush();
  }));

  it(' sendOrder() else', fakeAsync(() => {
    component.sendOrder();
    tick(3000);
    fixture.detectChanges();
    expect(component.orderEmpty).toBeFalsy();
    flush();
  }));
});
