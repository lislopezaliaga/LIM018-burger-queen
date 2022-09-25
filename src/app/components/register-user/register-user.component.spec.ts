import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/servicios/user.service';
import { RegisterUserComponent } from './register-user.component';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterUserComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            register: jasmine.createSpy('register'),
            addUser: jasmine.createSpy('addUser'),
            $register: {
              emit: jasmine.createSpy('emit'),
            },
          },
        },
      ],
    }).compileComponents();

    service = TestBed.inject(UserService);
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('register y adduser', () => {
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

    service.register = jasmine
      .createSpy()
      .and.returnValue(Promise.resolve(use));

    component.formReg.controls['nombres'].setValue('Ana');
    component.formReg.controls['apellidos'].setValue('Perez');

    service.addUser = jasmine
      .createSpy()
      .and.returnValue(Promise.resolve({ name: 'betty' }));
    component.onSubmit();

    fixture.detectChanges();

    expect(service.register).toHaveBeenCalled();
    expect(service.$register.emit).toHaveBeenCalledWith(false);
  });

  it('closeRegister', () => {
    component.closeRegister();
    expect(service.$register.emit).toHaveBeenCalledWith(false);
  });
});
