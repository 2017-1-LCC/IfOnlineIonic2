import { Component } from '@angular/core';
import { AlertController, NavParams, LoadingController  } from 'ionic-angular';
import { UserService } from '../../app/services/user.service'; //NavController
import { Storage } from "@ionic/storage";

export interface User {
    username:'',
    name:'',
    email:'',
    birthDate:'',
    _id:'',
    idOther:''
}

@Component({
  selector: 'EditUserPage',
  templateUrl: 'edituser.html',
})
export class EditUserPage {

  loggedUser:User;
  token:string;
  //createdUser:any={name:''};

  constructor(
   // private navCtrl: NavController, 
    private userService:UserService, 
    private alert:AlertController,
    private storage: Storage,
    private navParams:NavParams,
    private loadingCtrl:LoadingController
   ) 
   {
       this.loggedUser = this.navParams.data.user;
   }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(56px)';
      });
    } // end if
  }

  ionViewDidLeave() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(0)';
      });
    } // end if
  }

  ngOnInit() {
    this.storage.get('token')
      .then((token) => {
        this.token = token;
      })
      .catch( err => {
        console.log("erro no ngOnInit(): ",err);
      })
  }

  update() {
    let loading = this.loadingCtrl.create({content:'Carregando...'});

    loading.present();

    this.userService.update(this.token,this.loggedUser)
      .subscribe( result => {
        this.presentAlert(result.name);
        loading.dismiss();
      }, err => {
        loading.dismiss();
        this.presentErrorAlert('Erro ao atualizar usuário!');
      })  
  }

  presentErrorAlert(text:string) {
    const alert = this.alert.create({
      title: 'Error',
      subTitle: text,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentAlert(name) {
    const alert = this.alert.create({
      title: 'Sucesso',
      subTitle: 'Usuário '+name+' alterado com sucesso!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}