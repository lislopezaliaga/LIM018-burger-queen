// import { TestBed } from '@angular/core/testing';
// import { Auth } from '@angular/fire/auth';

// import { UserService } from './user.service';

// describe('UserService', () => {
//   let service: UserService;
//   let spyAuth:jasmine.SpyObj<Auth>;

//   beforeEach(async () => {
//     // spyAuth = jasmine.createSpyObj<Auth>('Auth', ['getUserById', 'login']);

//     spyAuth=jasmine.createSpyObj<Auth>('Auth', ['createUserWithEmailAndPassword', 'signInWithEmailAndPassword','signOut']);
//     await TestBed.configureTestingModule({
//       declarations: [UserService],
//       providers: [{ provide: Auth, useValue: spyAuth }],

//     });
//     service = TestBed.inject(UserService);
  

//     it('should be created', () => {
//       expect(service).toBeTruthy();
//     });
//   })
// })

