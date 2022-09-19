import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';


import { UserService } from 'src/app/servicios/user.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { Auth, UserCredential } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

export class AngularFireMock extends Auth {                   // added this class
  private Auth={};
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [{provide: Auth, useClass: AngularFireMock},{provide: Firestore, useValue: UserService},{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],

    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
