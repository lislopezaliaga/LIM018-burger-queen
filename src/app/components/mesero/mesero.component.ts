import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Users from 'src/app/data/data.users';

import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-mesero',
  templateUrl: './mesero.component.html',
  styleUrls: ['./mesero.component.css'],
})
export class MeseroComponent implements OnInit {
  sesion: any = sessionStorage.getItem('User');
  user: Users = JSON.parse(this.sesion);
  usuario: any = this.user.nombre;
  showTakeO: boolean = true;
  showOrdersR: boolean = false;
  cssColor: any = true;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    // this.nameUser();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
    this.userService.signOutUser();
  }

  showTakeOrder() {
    this.showTakeO = true;
    this.showOrdersR = false;
  }

  showOrderReady() {
    this.showOrdersR = true;
    this.showTakeO = false;
  }
}
