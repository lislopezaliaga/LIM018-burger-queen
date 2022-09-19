import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { UserService } from 'src/app/servicios/user.service';

import { MeseroComponent } from './mesero.component';

describe('MeseroComponent', () => {
  let component: MeseroComponent;
  let fixture: ComponentFixture<MeseroComponent>;
  let UserServiceSpy:jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    UserServiceSpy=jasmine.createSpyObj<UserService>('UserService',['register','login','signOutUser']);

    await TestBed.configureTestingModule({
      declarations: [ MeseroComponent ],
      providers: [{provide: UserService, useValue:UserServiceSpy }],

      
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeseroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
