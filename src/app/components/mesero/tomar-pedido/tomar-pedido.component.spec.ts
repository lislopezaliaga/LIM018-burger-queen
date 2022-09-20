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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
