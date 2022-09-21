import { ComponentFixture, TestBed,tick,fakeAsync,flush } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/servicios/user.service';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy:jasmine.SpyObj<UserService>;
  let formLogin:DebugElement;
  let btnLogin:HTMLElement;
  let lblError:any;
  let route: Router;

  beforeEach(async () => {
    userServiceSpy=jasmine.createSpyObj<UserService>('UserService',['getUserById','login']);
    
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[{provide:UserService,useValue:userServiceSpy}]
    })
    .compileComponents();
    route=TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // setTimeout(()=>{},0)

    formLogin=fixture.debugElement.query(By.css('form'));
    btnLogin=formLogin.nativeElement;
    lblError=fixture.nativeElement.querySelector('.error');

   
  });


  it('should create', () => {
    
    expect(component).toBeTruthy();

    
  });

  it('It should show an error in the label when the user does not enter data', fakeAsync(() => {

    userServiceSpy.login.and.callFake(()=> Promise.reject({code:'auth/missing-email'}));
  
    component.onSubmit();
    tick();
    fixture.detectChanges();
     
    expect(lblError.textContent).toBe('Debe ingresar un usuario y contraseña');
    flush(); 

  }));
  it('wrong password ', fakeAsync(() => {

    userServiceSpy.login.and.callFake(()=> Promise.reject({code:'auth/wrong-password'}));

    component.formLogin.controls['email'].setValue('mesero@burger.com');
    component.formLogin.controls['password'].setValue('ashgdiau');
    component.onSubmit();
    tick();
    fixture.detectChanges();
     
    expect(lblError.textContent).toBe('Contraseña incorrecta');
    flush(); 

  }));
  it('user not found', fakeAsync(() => {

    userServiceSpy.login.and.callFake(()=> Promise.reject({code:'auth/user-not-found'}));

    component.formLogin.controls['email'].setValue('notfound@burger.com');
    component.formLogin.controls['password'].setValue('ashgdiau');
    component.onSubmit();
    tick();
    fixture.detectChanges();
     
    expect(lblError.textContent).toBe('Usuario no registrado');
    flush(); 

  }));
/*   it('user not found', fakeAsync(() => {
    const use:any = {
      user: {uid:'hola',funcion:'admin'},
    };
    const hola:any = {
      funcion: 'admin',
    };
    console.log('rutaaaaaaaaaa'+route);
    userServiceSpy.login.and.callFake(()=>Promise.resolve(use));
    tick();
    
    userServiceSpy.getUserById.and.callFake(()=>Promise.resolve(hola));
    component.formLogin.controls['email'].setValue('mesero@burger.com');
    component.formLogin.controls['password'].setValue('ashgdiau');

    component.onSubmit();
    tick();
    fixture.detectChanges();
 
  
    // expect(route.navigate).toEqual('admin');
    expect(route.navigate).toHaveBeenCalledWith(['/admin']);
    flush(); 

  }));
 */
  
});
