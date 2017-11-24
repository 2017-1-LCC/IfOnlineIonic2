import { Component } from '@angular/core';
import { NavController,  AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserService } from '../../app/services/user.service';
 
@Component({
  selector: 'CreateUserPage',
  templateUrl: 'createuser.html',
})

export class CreateUserPage {

  user:Object={};
  createdUser:any={name:''};

  constructor(
    public navCtrl: NavController, 
    public userService:UserService, 
    public alert:AlertController,
    private loadingCtrl:LoadingController,
  ) 
  {

  }

  create() {
    let loading = this.loadingCtrl.create({content:'Carregando...'});
    loading.present();

    this.userService.create(this.user)
      .subscribe((result) => {
        if(result.error) {
          this.presentErrorAlert(result.message);
          loading.dismiss();
        } else {
          this.createdUser = result;
          this.presentAlert(this.createdUser.name);
          this.navCtrl.push(LoginPage);
          loading.dismiss();
        }
      }, (err) => {
        loading.dismiss();
        this.presentErrorAlert('Erro ao cadastrar usuário!');
      })
  }

  presentErrorAlert(text:string) {
    const alert = this.alert.create({
      title: 'Error',
      subTitle: 'Erro : '+text,
      buttons: ['Dismiss']
    });
    alert.present();
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