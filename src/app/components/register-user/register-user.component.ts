import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  formReg: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private registerM: UserService,
  ) { 
    this.formReg = new FormGroup({
    nombres: new FormControl(),
    apellidos: new FormControl(),
    password: new FormControl(),
    funcion: new FormControl()
  })
  
}

  ngOnInit(): void {
  }
  onSubmit() {
    this.userService.register(
      { email: this.formReg.value.nombres.slice(0,1).toLowerCase() + this.formReg.value.apellidos.toLowerCase() + "@burger.com", 
      password: this.formReg.value.password })
      .then(async response => {
        //this.router.navigate(['/login']);
        console.log(response);
        console.log(response.user.uid);
        

        const res = await this.userService.addUser({ 
          uid: response.user.uid,
          nombre: this.formReg.value.nombres,
          apellido: this.formReg.value.apellidos,
          email: this.formReg.value.nombres.slice(0,1).toLowerCase() + this.formReg.value.apellidos.toLowerCase() + "@burger.com", 
          funcion: this.formReg.value.funcion,
        },response.user.uid);
        console.log(res);


      })
      .catch(error => console.log(error));


      this.registerM.$register.emit(false);


  }

  closeRegister(){
    this.registerM.$register.emit(false)
  }

}
