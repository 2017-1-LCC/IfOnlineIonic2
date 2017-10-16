import { Component } from '@angular/core';
import { NavController , NavParams, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { GroupService } from '../../app/services/groups.service';
import { HomePage } from '../home/home';

@Component({
  selector: 'create-group',
  templateUrl: 'creategroup.html'
})
export class CreateGroupPage {

  group:any={admin:{}};
  idAdmin:string;
  token:string;

  constructor(private alert:AlertController, private navCtrl: NavController, 
    private navParams:NavParams, private groupService:GroupService,
    private storage: Storage) {
    this.idAdmin = this.navParams.data;
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


  create() {
   this.group.admin = this.idAdmin;
   
    this.groupService.createGroup(this.token, this.group)
      .subscribe( result => {
        this.presentAlert(result.discipline);
        this.navCtrl.setRoot(HomePage);
        console.log("grupo cadastrado com sucesso!:",result);
      }, err => {
        console.log("erro ao cadastrar grupo: ",err);
      })
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
