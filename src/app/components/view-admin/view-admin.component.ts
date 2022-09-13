import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servicios/user.service';
import Users from '../../data/data.users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})
export class ViewAdminComponent implements OnInit {

  users: Users[];
  numOrden: number=0;

  registerSwitch: boolean = false;

  constructor(private registerM:UserService,
    private userService: UserService,private router:Router) {
      this.users = [{
        uid: 'xxxxxx',
        nombre: 'remy',
        apellido: 'ratita',
        email: 'rratita@burger.com',
        funcion: 'cocinero'
      }]
     }

  ngOnInit(): void {
    this.registerM.$register.subscribe((valor)=>{this.registerSwitch=valor})
    this.userService.getUser().subscribe((users) => {
      this.users = users;       
    })
    
  }

  openRegister(){
    this.registerSwitch = true;
  }

  async onClickDelete( users: Users) {
    await this.userService.deleteRegistro(users);
    console.log(users);
    /*this.userService.deleteUsuario(users.uid).then(response =>); */
  }
  logout(){
    this.router.navigate(['login']);
  }

}
