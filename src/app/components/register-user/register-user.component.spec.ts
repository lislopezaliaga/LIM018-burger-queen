import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/servicios/user.service';

import { RegisterUserComponent } from './register-user.component';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let UserServiceSpy:jasmine.SpyObj<UserService>;

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
});
