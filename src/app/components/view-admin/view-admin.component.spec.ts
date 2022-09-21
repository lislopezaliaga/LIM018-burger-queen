import { ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import { UserService } from 'src/app/servicios/user.service';

import { ViewAdminComponent } from './view-admin.component';

describe('ViewAdminComponent', () => {
  let component: ViewAdminComponent;
  let fixture: ComponentFixture<ViewAdminComponent>;
  let userServiceSpy:jasmine.SpyObj<UserService>;
  let btnOpenReg:HTMLElement;
  let imgDelete:HTMLElement;

  beforeEach(async () => {
    userServiceSpy=jasmine.createSpyObj<UserService>('UserService',['deleteRegistro','signOutUser']);
    await TestBed.configureTestingModule({
      declarations: [ ViewAdminComponent ],
      providers: [{provide: UserService, useValue:userServiceSpy }],
      
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    btnOpenReg=fixture.nativeElement.querySelector('#openReg');
    imgDelete=fixture.nativeElement.querySelector('#imgDel');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('OpenReg', () => {
    fixture.detectChanges();
    btnOpenReg.click();
     expect(component.registerSwitch).toBeTruthy();
  });

  it('showTotalOrders', () => {
    fixture.detectChanges();
    component.showTotalOrders();
     expect(component.shorTotalOrd).toBeTruthy();
    expect(component.showRegister).toBeFalsy();

  });

  it('showUsers', () => {
    fixture.detectChanges();
    component.showUsers();
    expect(component.shorTotalOrd).toBeFalsy();
    expect(component.showRegister).toBeTruthy();
  });

  it('onClickDelete', fakeAsync(() => {
    const use:any = {
      user:{
              id: "a",
              uid: "12345",
              nombre: "Mary",
              apellido: "Gomez",
              email: "mgomez@burger",
              funcion: "mesero"
    }};
  
    userServiceSpy.deleteRegistro.and.callFake(()=>Promise.resolve(use));  
    tick();
    fixture.detectChanges();
    imgDelete.click();
    expect(userServiceSpy.deleteRegistro).toHaveBeenCalled();
    }));

});
