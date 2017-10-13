import { Component } from '@angular/core';
import { NavController,  AlertController  } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserService } from '../../app/services/user.service';
 
@Component({
  selector: 'CreateUserPage',
  templateUrl: 'createuser.html',
})

export class CreateUserPage {

  user:Object={};

  constructor(public navCtrl: NavController, public userService:UserService, public alert:AlertController ) {

  }

  create() {
    this.userService.create(this.user)
      .then((result) => {
        this.presentAlert(result.name);
        this.navCtrl.push(LoginPage);
        console.log("resultado: ",result);
      }, (err) => {
        console.log("error: ",err);
      })
  }

  backToLogin() {
    this.navCtrl.push(LoginPage);
  }


  presentAlert(name) {
    const alert = this.alert.create({
      title: 'Sucesso',
      subTitle: 'Usuário '+name+' cadastrado com sucesso!',
      buttons: ['Dismiss']
    });
    alert.present();
  }
}