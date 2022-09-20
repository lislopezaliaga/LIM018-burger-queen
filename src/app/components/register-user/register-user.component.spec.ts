import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/servicios/user.service';

import { RegisterUserComponent } from './register-user.component';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let UserServiceSpy:jasmine.SpyObj<UserService>;
  // let form:DebugElement;
  let btnLogin:HTMLElement;

  beforeEach(async () => {
    UserServiceSpy=jasmine.createSpyObj<UserService>('UserService',['register','login','signOutUser']);
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserComponent ],
      providers: [{provide: UserService, useValue:UserServiceSpy }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //   it('user not found', fakeAsync(() => {
  //   const use:any = {
  //     user: {uid:'hola',funcion:'admin'},
  //   };
  //   const hola:any = {
  //     funcion: 'admin',
  //   };
  //   console.log('rutaaaaaaaaaa'+route);
  //   userServiceSpy.login.and.callFake(()=>Promise.resolve(use));
  //   tick();
    
  //   userServiceSpy.getUserById.and.callFake(()=>Promise.resolve(hola));
  //   component.formLogin.controls['email'].setValue('mesero@burger.com');
  //   component.formLogin.controls['password'].setValue('ashgdiau');

  //   component.onSubmit();
  //   tick();
  //   fixture.detectChanges();
 
  
  //   // expect(route.navigate).toEqual('admin');
  //   expect(route.navigate).toHaveBeenCalledWith(['/admin']);
  //   flush(); 

  // }));

});
