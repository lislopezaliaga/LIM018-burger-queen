import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/servicios/user.service';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewAdminComponent } from '../view-admin/view-admin.component';
import { MeseroComponent } from '../mesero/mesero.component';
import { ChefComponent } from '../chef/chef.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let formLogin: DebugElement;
  let btnLogin: HTMLElement;
  let lblError: any;
  let router: Router;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService', [
      'getUserById',
      'login',
    ]);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'admin', component: ViewAdminComponent },
          { path: 'waiter', component: MeseroComponent },
          { path: 'chef', component: ChefComponent },
        ]),
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formLogin = fixture.debugElement.query(By.css('form'));
    btnLogin = formLogin.nativeElement;
    lblError = fixture.nativeElement.querySelector('.error');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('It should show an error in the label when the user does not enter data', fakeAsync(() => {
    userServiceSpy.login.and.callFake(() =>
      Promise.reject({ code: 'auth/missing-email' })
    );

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(lblError.textContent).toBe('Debe ingresar un usuario y contraseña');
    flush();
  }));
  it('wrong password ', fakeAsync(() => {
    userServiceSpy.login.and.callFake(() =>
      Promise.reject({ code: 'auth/wrong-password' })
    );

    component.formLogin.controls['email'].setValue('mesero@burger.com');
    component.formLogin.controls['password'].setValue('ashgdiau');
    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(lblError.textContent).toBe('Contraseña incorrecta');
    flush();
  }));
  it('user not found', fakeAsync(() => {
    userServiceSpy.login.and.callFake(() =>
      Promise.reject({ code: 'auth/user-not-found' })
    );

    component.formLogin.controls['email'].setValue('notfound@burger.com');
    component.formLogin.controls['password'].setValue('ashgdiau');
    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(lblError.textContent).toBe('Usuario no registrado');
    flush();
  }));

  it('Router, admin', fakeAsync(() => {
    const use: any = {
      user: { uid: 'hola' },
    };
    const funcion: any = {
      funcion: 'admin',
    };
    userServiceSpy.login.and.callFake(() => Promise.resolve(use));
    userServiceSpy.getUserById.and.callFake(() => Promise.resolve(funcion));
    spyOn(router, 'navigate');
    component.onSubmit();
    tick();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['admin']);
  }));

  it('Router, waiter', fakeAsync(() => {
    const use: any = {
      user: { uid: 'hola' },
    };
    const funcion: any = {
      funcion: 'mesero',
    };
    userServiceSpy.login.and.callFake(() => Promise.resolve(use));
    userServiceSpy.getUserById.and.callFake(() => Promise.resolve(funcion));
    spyOn(router, 'navigate');
    component.onSubmit();
    tick();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['waiter']);
  }));

  it('Router, chef', fakeAsync(() => {
    const use: any = {
      user: { uid: 'hola' },
    };
    const funcion: any = {
      funcion: 'cocinero',
    };
    userServiceSpy.login.and.callFake(() => Promise.resolve(use));
    userServiceSpy.getUserById.and.callFake(() => Promise.resolve(funcion));
    spyOn(router, 'navigate');
    component.onSubmit();
    tick();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['chef']);
  }));
});
