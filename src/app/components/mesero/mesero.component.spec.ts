import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/servicios/user.service';
import { MeseroComponent } from './mesero.component';

describe('MeseroComponent', () => {
  let component: MeseroComponent;
  let fixture: ComponentFixture<MeseroComponent>;
  let UserServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    UserServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['register', 'login', 'signOutUser']);

    /* const store: any = {};
    spyOn(sessionStorage, 'getItem').and.callFake((key) => {
      return store[key];
    });
    spyOn(sessionStorage, 'setItem').and.callFake((key, value) => {
      console.log(key);
      return store[key] = value + '';
    }); */
    await TestBed.configureTestingModule({
      declarations: [MeseroComponent],
      providers: [{ provide: UserService, useValue: UserServiceSpy }],

    })
      .compileComponents();

    sessionStorage.setItem('User','{"uid":"AextYYpYUrghueil3WbfCfBN0p93","nombre":"Miguel"}');

    fixture = TestBed.createComponent(MeseroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
