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
    
        sessionStorage.setItem('User', JSON.stringify(user));
        
      if(response.user.email==="admin@burger.com"){
        this.router.navigate(['admin']);
      }else{
        this.router.navigate(['mesero']);
      }
      })


    })
    .catch(error => console.log(error))
  }

}
