import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/servicios/user.service';
import { LoginComponent } from '../login/login.component';
import { MeseroComponent } from './mesero.component';

describe('MeseroComponent', () => {
  let component: MeseroComponent;
  let fixture: ComponentFixture<MeseroComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let router: Router;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['register', 'login', 'signOutUser']);

    await TestBed.configureTestingModule({
      declarations: [MeseroComponent],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
      imports: [
        RouterTestingModule.withRoutes([
            { path: 'login', component: LoginComponent },
        ])
      ]

    })
      .compileComponents();

    sessionStorage.setItem('User','{"uid":"AextYYpYUrghueil3WbfCfBN0p93","nombre":"Miguel"}');
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(MeseroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showTakeOrder', () => {
    fixture.detectChanges();
    component.showTakeOrder();
    /* btnOpenReg.triggerEventHandler('click', null); */
    expect(component.showTakeO).toBeTruthy();
    expect(component.showOrdersR).toBeFalsy();
  });

  it('showOrderReady', () => {
    fixture.detectChanges();
    component.showOrderReady();
    /* btnOpenReg.triggerEventHandler('click', null); */
    expect(component.showOrdersR).toBeTruthy();
    expect(component.showTakeO).toBeFalsy();
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
