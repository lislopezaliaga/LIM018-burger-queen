import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomarPedidoComponent } from './tomar-pedido.component';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/servicios/user.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
// import { AppComponent } from './app.component';
// import { UserService } from './servicios/user.service';

describe('TomarPedidoComponent', () => {
  let component: TomarPedidoComponent;
  let fixture: ComponentFixture<TomarPedidoComponent>;
  let order;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TomarPedidoComponent ],
      providers: [{provide: Auth, useValue: UserService},{provide: Firestore, useValue: UserService}],

    })
    .compileComponents();

    sessionStorage.setItem('User','{"uid":"AextYYpYUrghueil3WbfCfBN0p93","nombre":"Miguel"}');

    fixture = TestBed.createComponent(TomarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    order=[
            {descripcion:'cafe',
            precio: 5,
            cantidad: 1},
            {descripcion:'jugo',
            precio: 6,
            cantidad: 1},
            {descripcion:'leche',
            precio: 7,
            cantidad: 2}
          ];
    component.pedido = order;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filterMenu Hamburguesa simple', () => {
    fixture.detectChanges();
    component.filterMenu("Hamburguesa simple");
    expect(component.selectSimple).toBeTruthy();
    expect(component.selectDoble).toBeFalsy();
  });

  it('filterMenu Hamburguesa doble', () => {
    fixture.detectChanges();
    component.filterMenu("Hamburguesa doble");
    expect(component.selectSimple).toBeFalsy();
    expect(component.selectDoble).toBeTruthy();
  });

  it('filterMenu desayuno', () => {
    fixture.detectChanges();
    component.filterMenu('Desayuno');
    expect(component.typeMenu).toBe('Desayuno');
    expect(component.selectDoble).toBeTruthy();
  });

  it('deleteItems', () => {
    fixture.detectChanges();
    component.deleteItems('cafe');
    expect(component.pedido.length).toBe(2);
   });

   it('addItems', () => {
    fixture.detectChanges();
    component.addItems('cafe', 5);
    expect(component.pedido[0].cantidad).toBe(2);
    expect(component.pedido[0].precio).toBe(10);
   });

   it('removeItems', () => {
    fixture.detectChanges();
    component.removeItems('leche', 14);
    expect(component.pedido[2].cantidad).toBe(1);
    expect(component.pedido[2].precio).toBe(7);
   });

/*    it('removeItems', () => {
    fixture.detectChanges();
    component.removeItems('jugo', 6);
    expect(component.pedido[1].cantidad).toBe(0);
    }); */

});
