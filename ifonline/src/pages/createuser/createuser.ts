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
  createdUser:any={name:''};

  constructor(public navCtrl: NavController, public userService:UserService, public alert:AlertController ) {

  }

  create() {
    this.userService.create(this.user)
      .then((result) => {
        this.createdUser = result;
        this.presentAlert(this.createdUser.name);
        this.navCtrl.push(LoginPage);
      }, (err) => {
        console.log("error: ",err);
      })
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