import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { TotalOrdersComponent } from './total-orders.component';

describe('TotalOrdersComponent', () => {
  let component: TotalOrdersComponent;
  let fixture: ComponentFixture<TotalOrdersComponent>;
  let pedidoServiceSpy: jasmine.SpyObj<PedidoService>;

  beforeEach(async () => {
    pedidoServiceSpy = jasmine.createSpyObj<PedidoService>('PedidoService', [
      'addPedido',
      'getPedido',
      'getOrderTotal',
      'updatePedido',
    ]);
    pedidoServiceSpy.getOrderTotal.and.returnValue(
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
      declarations: [TotalOrdersComponent],
      providers: [{ provide: PedidoService, useValue: pedidoServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar los todos los pedidos', () => {
    expect(component.pedidos.length).toBe(2);
  });
});
