import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoService } from 'src/app/servicios/pedido.service';

import { OrderReadyComponent } from './order-ready.component';
import { of } from 'rxjs';

describe('OrderReadyComponent', () => {
  let component: OrderReadyComponent;
  let fixture: ComponentFixture<OrderReadyComponent>;
  let pedidoServiceSpy: jasmine.SpyObj<PedidoService>;

  beforeEach(async () => {
    pedidoServiceSpy = jasmine.createSpyObj<PedidoService>('PedidoService', [
      'updatePedido',
      'getPedido',
    ]);
    pedidoServiceSpy.getPedido.and.returnValue(
      of([
        {
          waiter: 'Miguel',
          client: 'TengoHambre',
          pedidos: [],
          timeShow: '',
          timeStart: '',
          timeEnd: 'cocinero',
          status: 'cocinero',
          totalPrice: 'cocinero',
        },
        {
          waiter: 'Juan',
          client: 'TengoHambre',
          pedidos: [],
          timeShow: '',
          timeStart: '',
          timeEnd: 'cocinero',
          status: 'cocinero',
          totalPrice: 'cocinero',
        },
      ])
    );

    await TestBed.configureTestingModule({
      declarations: [OrderReadyComponent],
      providers: [{ provide: PedidoService, useValue: pedidoServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' sendOrderDelivered', () => {
    pedidoServiceSpy.updatePedido.and.callFake(() => Promise.resolve());
    component.sendOrderDelivered('2', 0);
    expect(pedidoServiceSpy.updatePedido).toHaveBeenCalled();
  });
});
