import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateUserPage } from '../createuser/createuser';
import { AuthService } from '../../app/services/auth.service';
 
@Component({
  selector: 'LoginPage',
  templateUrl: 'login.html',
})

export class LoginPage {
  
  username:string;
  password:string;

  constructor(public navCtrl: NavController, private authService:AuthService) {

  }

  login() {
    const user = {
      username:this.username,
      password:this.password
    };

    this.authService.login(user);
  }

  newUser() {
   //console.log("executei");
   this.navCtrl.push(CreateUserPage);
  }
}