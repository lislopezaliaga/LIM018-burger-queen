import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/servicios/user.service';
import { LoginComponent } from '../login/login.component';

import { ViewAdminComponent } from './view-admin.component';

describe('ViewAdminComponent', () => {
  let component: ViewAdminComponent;
  let fixture: ComponentFixture<ViewAdminComponent>;
  let btnOpenReg: HTMLElement;
  let imgDelete: HTMLElement;
  let router: Router;
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAdminComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            deleteRegistro: jasmine.createSpy('deleteRegistro'),
            signOutUser: jasmine.createSpy('signOutUser'),
            getUser: jasmine.createSpy('getUser'),
            $register: {
              subscribe: jasmine
                .createSpy('subscribe')
                .and.callFake(data => data()),
            },
          },
        },
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
      ],
    }).compileComponents();
    //
    service = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    // service.$register.subscribe= jasmine.createSpy().and.returnValue(()=>{});
    service.getUser = jasmine.createSpy().and.returnValue(of([{}]));

    fixture = TestBed.createComponent(ViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    btnOpenReg = fixture.nativeElement.querySelector('#openReg');
    imgDelete = fixture.nativeElement.querySelector('#imgDel');
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
    service.$register.subscribe = jasmine.createSpy().and.returnValue(() => {});
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
    const use: any = {
      user: {
        id: 'a',
        uid: '12345',
        nombre: 'Mary',
        apellido: 'Gomez',
        email: 'mgomez@burger',
        funcion: 'mesero',
      },
    };
    service.deleteRegistro = jasmine
      .createSpy()
      .and.returnValue(Promise.resolve(use));
    /*   service.deleteRegistro.and.callFake(()=>Promise.resolve(use));  */
    tick();
    fixture.detectChanges();
    imgDelete.click();
    expect(service.deleteRegistro).toHaveBeenCalled();
  }));

  it('logout()', fakeAsync(() => {
    service.signOutUser = jasmine
      .createSpy()
      .and.returnValue(Promise.resolve());

    spyOn(router, 'navigate');
    component.logout();
    tick();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
    expect(service.signOutUser).toHaveBeenCalled();
  }));

  // it('ngOnInit', fakeAsync(() =>  {
  //   service.$register.subscribe= jasmine.createSpy().and.callFake(()=>'value');
  //   component.ngOnInit();

  //   tick(1000);
  //   fixture.detectChanges();

  //   expect(service.$register.subscribe).toHaveBeenCalled();
  //   expect(component.registerSwitch).toBeFalsy;
  // }));
});
