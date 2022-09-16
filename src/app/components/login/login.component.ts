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
    this.userService.login(this.formLogin.value)
    .then(response => { 
      this.userService.getUserById(response.user.uid).then((user:any)=>{
        console.log(user);
        
    
        sessionStorage.setItem('User', JSON.stringify(user));

        
      if(user.funcion==="admin"){
        this.router.navigate(['admin']);
      }else if(user.funcion==="mesero"){
        this.router.navigate(['waiter']);
      }else if(user.funcion==="cocinero"){
        this.router.navigate(['chef']);
      }
      })


    })
    .catch(error => console.log(error))
  }

}
