import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { JwtHelper } from "angular2-jwt";
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { CreateUserPage } from '../createuser/createuser';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../app/services/auth.service';
 
@Component({
  selector: 'LoginPage',
  templateUrl: 'login.html',
})

export class LoginPage {

  user:Object={};
  jwtHelper = new JwtHelper();

  constructor(
    private navCtrl: NavController,
    private authService:AuthService, 
    private alertCtrl: AlertController, 
    private loadingCtrl:LoadingController, 
    private storage:Storage
    ) {
  
    storage.ready()
      .then(() => {
        storage.get('token')
          .then( token => {
            if(token) {
              this.navCtrl.setRoot(TabsPage);
            } 
            console.log("storage ready() token: ",token);
          })
          .catch( err => {
            console.log("erro no storage ready: ",err);
          })
      })
  }

  login() {
    let loading = this.loadingCtrl.create({content:'Carregando...'});

    loading.present();

    this.authService.login(this.user)
      .subscribe(
        result => {
          this.authSuccess(result.token);
          loading.dismiss();
        }, 
        err => {
          loading.dismiss();
          console.log("erro ao logar: ",err);
          this.presentErrorAlert('Usuário não encontrado!');
        }
      )
  }

  newUser() {
   this.navCtrl.push(CreateUserPage);
  }

  authSuccess(token) {
    this.storage.set('token',token);
    this.navCtrl.setRoot(TabsPage);
  }

  presentSuccessAlert(text:string) {
    const alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: text,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentErrorAlert(text:string) {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}