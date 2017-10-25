import { Component } from '@angular/core';
import { NavController,  AlertController, NavParams  } from 'ionic-angular';
import { ProfileService } from '../../app/services/profile.service';
import { Storage } from "@ionic/storage";

export interface User {
    username:'',
    name:'',
    email:'',
    birthDate:'',
    lastPassword:'',
    newPassword:'',
    repeatedPassword:''
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
    private navCtrl: NavController, 
    private profileService:ProfileService, 
    private alert:AlertController,
    private storage: Storage,
    private navParams:NavParams
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
    const alert = this.alert.create({
      title: 'Informação',
      subTitle: 'Funcionalidade em desenvolvimento',
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