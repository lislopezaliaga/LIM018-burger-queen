import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-mesero',
  templateUrl: './mesero.component.html',
  styleUrls: ['./mesero.component.css']
})
export class MeseroComponent implements OnInit {
  sesion:any=sessionStorage.getItem('User');
  user=JSON.parse(this.sesion);
  usuario:any=this.user.nombre;

  constructor(private router: Router,
    private userService:UserService) { }

    ngOnInit(): void {
      // this.nameUser();

    
  }
  saveUser(){
    // <HTMLLabelElement>.target
    sessionStorage.setItem('Name', JSON.stringify(this.usuario));
  }


  logout(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  


}
