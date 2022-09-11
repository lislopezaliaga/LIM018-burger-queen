import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomarPedidoComponent } from './tomar-pedido.component';

describe('TomarPedidoComponent', () => {
  let component: TomarPedidoComponent;
  let fixture: ComponentFixture<TomarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TomarPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TomarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
