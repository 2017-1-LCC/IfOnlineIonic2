import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateUserPage } from '../createuser/createuser';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../app/services/auth.service';
 
@Component({
  selector: 'LoginPage',
  templateUrl: 'login.html',
})

export class LoginPage {

  user:Object={};

  constructor(public navCtrl: NavController, private authService:AuthService) {

  }

  login() {
    this.authService.login(this.user)
      .then((result) => {
        this.navCtrl.push(TabsPage, result);
      }, (err) => {
        console.log("erro ao logar: ",err);
      })
  }

  newUser() {
   this.navCtrl.push(CreateUserPage);
  }
}