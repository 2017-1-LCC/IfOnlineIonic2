import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController , LoadingController } from 'ionic-angular';
import { CreateUserPage } from '../createuser/createuser';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../app/services/auth.service';
 
@Component({
  selector: 'LoginPage',
  templateUrl: 'login.html',
})

export class LoginPage {

  user:Object={};

  constructor(public navCtrl: NavController, private authService:AuthService, public alertCtrl: AlertController, public loadingCtrl:LoadingController) {

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

  presentAlert() {
    const alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: 'Usuário cadastrado com sucesso!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

}