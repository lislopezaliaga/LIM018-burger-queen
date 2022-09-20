import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { UserService } from 'src/app/servicios/user.service';
import { of } from 'rxjs';

import { ChefComponent } from './chef.component';

describe('ChefComponent', () => {
  let component: ChefComponent;
  let fixture: ComponentFixture<ChefComponent>;
  let userServiceSpy:jasmine.SpyObj<UserService>;
  let pedidoServiceSpy:jasmine.SpyObj<PedidoService>;

  beforeEach(async () => {
    userServiceSpy=jasmine.createSpyObj<UserService>('UserService',['register','login','signOutUser']);
    pedidoServiceSpy=jasmine.createSpyObj<PedidoService>('PedidoService',['addPedido','getPedido','getOrderTotal','updatePedido']);
    pedidoServiceSpy.getPedido.and.returnValue(of([
      {
        waiter: 'Miguel',
        client: 'TengoHambre',
        pedidos: [],
        timeShow: '',
        timeStart: '',
        timeEnd: 'cocinero',
        status: 'cocinero',
        totalPrice: 'cocinero'
      },
      {
        waiter: 'Juan',
        client: 'TengoHambre',
        pedidos: [],
        timeShow: '',
        timeStart: '',
        timeEnd: 'cocinero',
        status: 'cocinero',
        totalPrice: 'cocinero'
      }
    ]));
    
    await TestBed.configureTestingModule({
      declarations: [ ChefComponent ],
      providers: [{provide: UserService, useValue:userServiceSpy },
        {provide: PedidoService, useValue:pedidoServiceSpy }],
    })
    .compileComponents();

    sessionStorage.setItem('User','{"uid":"AextYYpYUrghueil3WbfCfBN0p93","nombre":"Miguel"}');

    fixture = TestBed.createComponent(ChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
