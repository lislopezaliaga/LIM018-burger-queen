import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicios/user.service';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})
export class ViewAdminComponent implements OnInit {

  registerSwitch: boolean = false;

  constructor(private registerM:UserService) { }

  ngOnInit(): void {
    this.registerM.$register.subscribe((valor)=>{this.registerSwitch=valor})
  }

  openRegister(){
    this.registerSwitch = true;
  }

}
