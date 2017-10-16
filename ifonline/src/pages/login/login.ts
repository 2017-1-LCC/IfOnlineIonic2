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

  constructor(private navCtrl: NavController, private authService:AuthService, 
    public alertCtrl: AlertController, public loadingCtrl:LoadingController, private storage:Storage) {
  
    storage.ready()
      .then(() => {
        storage.get('token')
          .then( token => {
            if(token) {
              this.navCtrl.setRoot(TabsPage,token);
            } 
            console.log("storage ready() token: ",token);
          })
          .catch( err => {
            console.log("erro no storage ready: ",err);
          })
      })
  }

  login() {
    this.authService.login(this.user)
      .subscribe(
        result => this.authSuccess(result.token) , 
        err => console.log("erro ao logar: ",err)
      )
  }

  newUser() {
   this.navCtrl.push(CreateUserPage);
  }

  authSuccess(token) {
    this.storage.set('token',token);
    //this.storage.set('typeUser',this.jwtHelper.decodeToken(token).typeUser);
    //this.storage.set('idUser',this.jwtHelper.decodeToken(token).idUser);
    this.navCtrl.setRoot(TabsPage);
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
// cleziel 11ec
// hc3 ea43
// tata 1177
}