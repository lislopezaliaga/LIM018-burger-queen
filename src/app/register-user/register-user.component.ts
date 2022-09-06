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
    password: new FormControl()
  })
  
}

  ngOnInit(): void {
  }
  onSubmit() {
    this.userService.register(
      { email: this.formReg.value.nombres.slice(0,1) + this.formReg.value.apellidos + "@burger.com", 
      password: this.formReg.value.password })
      .then(response => {
        console.log(response);
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

  closeRegister(){
    this.registerM.$register.emit(false)
  }

}
