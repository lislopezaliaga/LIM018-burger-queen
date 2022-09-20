import { ComponentFixture, TestBed,tick,fakeAsync,flush } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/servicios/user.service';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core'
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy:jasmine.SpyObj<UserService>;
  let formLogin:DebugElement;
  let btnLogin:HTMLElement;
  let lblError:any;

  beforeEach(async () => {
    userServiceSpy=jasmine.createSpyObj<UserService>('UserService',['register','login','signOutUser']);
    
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[{provide:UserService,useValue:userServiceSpy}]
    })
    .compileComponents();

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
    console.log('holas');
    
  });

  it('It should show an error in the label when the user does not enter data', fakeAsync(() => {

    userServiceSpy.login.and.callFake(()=> Promise.reject({code:'auth/missing-email'}));
    spyOn(window, 'setTimeout').and.callThrough();

    component.onSubmit();
    tick();
    fixture.detectChanges();
     
    expect(lblError.textContent).toBe('Debe ingresar un usuario y contraseña');

    flush(); 

  }));
  it('It should show an error in the label when the user does not enter data', fakeAsync(() => {

    userServiceSpy.login.and.callFake(()=> Promise.reject({code:'auth/missing-email'}));
    spyOn(window, 'setTimeout').and.callThrough();

    component.onSubmit();
    tick();
    fixture.detectChanges();
     
    expect(lblError.textContent).toBe('Debe ingresar un usuario y contraseña');

    flush(); 

  }))

  
});
