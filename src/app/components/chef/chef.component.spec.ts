import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { UserService } from 'src/app/servicios/user.service';
import { of, timer } from 'rxjs';

import { ChefComponent } from './chef.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewAdminComponent } from '../view-admin/view-admin.component';
import { MeseroComponent } from '../mesero/mesero.component';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

describe('ChefComponent', () => {
  let component: ChefComponent;
  let fixture: ComponentFixture<ChefComponent>;
  let userServiceSpy:jasmine.SpyObj<UserService>;
  let pedidoServiceSpy:jasmine.SpyObj<PedidoService>;
  let btnListo:HTMLElement;
  let router: Router;

  beforeEach(async () => {
    userServiceSpy=jasmine.createSpyObj<UserService>('UserService',['register','login','signOutUser']);
    pedidoServiceSpy=jasmine.createSpyObj<PedidoService>('PedidoService',['updatePedido', 'getPedido']);
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
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'admin', component: ViewAdminComponent },
            { path: 'waiter', component: MeseroComponent },
            { path: 'chef', component: ChefComponent },
            { path: 'login', component: LoginComponent },
          ])
        ]
    })
    .compileComponents();

    sessionStorage.setItem('User','{"uid":"AextYYpYUrghueil3WbfCfBN0p93","nombre":"Miguel"}');
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    btnListo=fixture.nativeElement.querySelector('#btnReady');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

/*   it('sendOrderReady', () => {
    let takeOrder:any={
      id: '2',
      waiter: '',
      client: '',
      pedidos: '',
      timeShow: '',
      timeStart:  '',
      timeEnd:'',
      status:'',
      totalPrice:0
    };
    pedidoServiceSpy.updatePedido.and.callFake(() => Promise.resolve(takeOrder));
    component.sendOrderReady('2', 0)
    expect(pedidoServiceSpy.updatePedido).toHaveBeenCalled();
  }); */

  it("should return decremented duration as time passes", () => {
    let momentoActual:any = new Date();
    expect(component.mueveReloj((Date.parse(momentoActual)*0.001))).toBe('00:00:00');
  });

  it('logout()', fakeAsync(() => {
    userServiceSpy.signOutUser.and.callFake(() => Promise.resolve());
    spyOn(router, 'navigate');
    component.logout();
    tick();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
    expect(userServiceSpy.signOutUser).toHaveBeenCalled();
  }));
  
});
