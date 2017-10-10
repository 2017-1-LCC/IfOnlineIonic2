import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserService } from '../../app/services/user.service';
 
@Component({
  selector: 'CreateUserPage',
  templateUrl: 'createuser.html',
})

export class CreateUserPage {

  user:Object={};

  constructor(public navCtrl: NavController, private userService:UserService) {

  }

  create() {
    //console.log("user: ",this.user);
    this.userService.create(this.user)
      .subscribe(data => console.log(data))
  }

  backToLogin() {
    this.navCtrl.push(LoginPage);
  }
}