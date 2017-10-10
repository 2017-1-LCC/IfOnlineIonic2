import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserService } from '../../app/services/user.service';
 
@Component({
  selector: 'CreateUserPage',
  templateUrl: 'createuser.html',
})

export class CreateUserPage {
  
  username:string;
  password:string;
  email:string;
  name:string;
  birthDate:Date;


  constructor(public navCtrl: NavController, private userService:UserService) {

  }

  create() {
    const newUser = {
      username:this.username,
      password:this.password,
      email:this.email,
      name:this.name,
      birthDate:this.birthDate
    }

    this.userService.create(newUser);
  }

  backToLogin() {
    this.navCtrl.push(LoginPage);
  }
}