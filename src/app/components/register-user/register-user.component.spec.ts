import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { UserService } from 'src/app/servicios/user.service';
import { By } from '@angular/platform-browser';
import { RegisterUserComponent } from './register-user.component';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let userServiceSpy:jasmine.SpyObj<UserService>;
  // let form:DebugElement;
  /* let btnLogin:HTMLElement; */
 /*  let formRegister:DebugElement; */

  beforeEach(async () => {
    userServiceSpy=jasmine.createSpyObj<UserService>('UserService',['register','addUser']);
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserComponent ],
      providers: [{provide: UserService, useValue:userServiceSpy }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
  /*   formRegister=fixture.debugElement.query(By.css('form')); */
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('register y adduser', fakeAsync(() => {
  const use:any = {
    user:{
            id: "a",
            uid: "12345",
            nombre: "Mary",
            apellido: "Gomez",
            email: "mgomez@burger",
            funcion: "mesero"
  }};

  userServiceSpy.register.and.callFake(()=>Promise.resolve(use));  
  component.formReg.controls['nombres'].setValue('Ana');
  component.formReg.controls['apellidos'].setValue('Perez');

  userServiceSpy.addUser.and.callFake(()=>Promise.resolve());
  component.onSubmit();
  tick();
  fixture.detectChanges();


  expect(userServiceSpy.register).toHaveBeenCalled();
  expect(userServiceSpy.addUser).toHaveBeenCalled();
  }));

});
