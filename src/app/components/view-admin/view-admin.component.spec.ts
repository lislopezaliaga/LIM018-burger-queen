import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/servicios/user.service';

import { ViewAdminComponent } from './view-admin.component';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';

describe('ViewAdminComponent', () => {
  let component: ViewAdminComponent;
  let fixture: ComponentFixture<ViewAdminComponent>;
  let userServiceSpy:jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceSpy=jasmine.createSpyObj<UserService>('UserService',['register','login','signOutUser','getUser']);
    userServiceSpy.getUser.and.returnValue(of([
      {
        uid: 'xxxxxx',
        nombre: 'remy',
        apellido: 'ratita',
        email: 'rratita@burger.com',
        funcion: 'cocinero'
      },{
        uid: 'xxxx',
        nombre: 'remy',
        apellido: 'ratita',
        email: 'rratita@burger.com',
        funcion: 'cocinero'
      }
    ]));
    await TestBed.configureTestingModule({
      declarations: [ ViewAdminComponent ],
      providers: [{provide: UserService, useValue:userServiceSpy }],
      
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
