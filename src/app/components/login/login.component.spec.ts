import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/servicios/user.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy:jasmine.SpyObj<UserService>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

/*   it('onSubmit', () => {
    component.onSubmit();
    userServiceSpy.login.and.returnValue(Promise.resolve(
      {user:
        {uid:"AextYYpYUrghueil3WbfCfBN0p93"
        email:"mesero@burger.com"}}
      
      )); */

    /* const resultado = component.login(this.formLogin.value)
    resultado.then((res)=> expect(res).toStrictEqual('auth/missing-email')).catch((rej)=>rej); */
/*   }); */
  
});
