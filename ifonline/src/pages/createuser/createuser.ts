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

  constructor(public navCtrl: NavController, public userService:UserService) {

  }

  create() {
    this.userService.create(this.user)
      .then((result) => {
        console.log("resultado: ",result);
      }, (err) => {
        console.log("error: ",err);
      })
  }

  backToLogin() {
    this.navCtrl.push(LoginPage);
  }
}