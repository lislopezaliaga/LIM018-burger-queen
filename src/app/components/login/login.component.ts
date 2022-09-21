import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/servicios/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  errorText: boolean = true;
  textError: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    sessionStorage.clear();
    this.userService.login(this.formLogin.value)
      .then(response => {

        this.userService.getUserById(response.user.uid).then((user: any) => {
          sessionStorage.setItem('User', JSON.stringify(user));
          if (user.funcion === "admin") {
            this.router.navigate(['admin']);
          } else if (user.funcion === "mesero") {
            this.router.navigate(['waiter']);
          } else if (user.funcion === "cocinero") {
            this.router.navigate(['chef']);
          }
        })
      })
      .catch(error => {
        if (error.code == 'auth/missing-email') {
          this.errorText = true;
          this.textError = 'Debe ingresar un usuario y contraseña';
          setTimeout(() => {
            this.errorText = false;
          }, 3000);
        } else if (error.code == 'auth/wrong-password') {
          this.errorText = true;
          this.textError = 'Contraseña incorrecta';
          setTimeout(() => {
            this.errorText = false;
          }, 3000);
        } else if (error.code == 'auth/user-not-found') {
          this.errorText = true;
          this.textError = 'Usuario no registrado';
          setTimeout(() => {
            this.errorText = false;
          }, 3000);
        }
      })
  }

}
