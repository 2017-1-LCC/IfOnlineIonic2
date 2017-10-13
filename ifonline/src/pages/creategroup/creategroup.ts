import { Component } from '@angular/core';
import { NavController , NavParams, AlertController } from 'ionic-angular';
import { GroupService } from '../../app/services/groups.service';

@Component({
  selector: 'create-group',
  templateUrl: 'creategroup.html'
})
export class CreateGroupPage {

  group:any={admin:{}};
  id:string;
  token:string;

  constructor(public alert:AlertController, public navCtrl: NavController, public navParams:NavParams, public groupService:GroupService) {
    this.id = this.navParams.data._id;
    this.token = this.navParams.data.token;
  }


  create() {
   this.group.admin = this.id;
   
    this.groupService.createGroup(this.token, this.group)
      .then( result => {
        this.presentAlert(result.discipline);
        this.navCtrl.pop();
        console.log("grupo cadastrado com sucesso!:",result);
      }, err => {
        console.log("erro ao cadastrar grupo: ",err);
      })
  }

  backToProfile() {
    this.navCtrl.pop();
  }

  presentAlert(name) {
    const alert = this.alert.create({
      title: 'Sucesso',
      subTitle: 'Grupo '+name+' cadastrado com sucesso!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
