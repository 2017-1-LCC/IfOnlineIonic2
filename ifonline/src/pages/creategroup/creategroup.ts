import { Component } from '@angular/core';
import { NavController,LoadingController , NavParams, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { GroupService } from '../../app/services/groups.service';
import { HomePage } from '../home/home';

export interface Group {
      classSchedule:[{
        dayOfWeek:'',
        startTime:'',
        endTime:'',
        removed:false
      }],
      proof:[{
        subjects:'',
        dateProof:'',
        value:'',
        removed:false
      }],
      admin:{}
}

@Component({
  selector: 'create-group',
  templateUrl: 'creategroup.html'
})
export class CreateGroupPage {

  group:Group;
  idAdmin:string;
  token:string;
  

  constructor(
    private alert:AlertController, 
    private navCtrl: NavController, 
    private navParams:NavParams, 
    private groupService:GroupService,
    private storage: Storage,
    public loadingCtrl:LoadingController
    ) {
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
   let loading = this.loadingCtrl.create({content:'Carregando...'});

   loading.present();

   this.group.admin = this.idAdmin;
   
    this.groupService.createGroup(this.token, this.group)
      .subscribe( result => {
        this.presentAlert(result.discipline);
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
        console.log("grupo cadastrado com sucesso!:",result);
      }, err => {
        loading.dismiss();
        this.presentErrorAlert('Erro ao cadastrar grupo!');
        console.log("erro ao cadastrar grupo: ",err);
      })
  }

  addProof() {
    this.group.proof.push({subjects:'',dateProof:'',value:'',removed:false});
  }

  removeProof(proof) {
    return proof.removed = true;
  }

  addClassSchedule() {
    this.group.classSchedule.push({dayOfWeek:'',startTime:'',endTime:'',removed:false});
  }

  removeClassSchedule(classSchedule) {
    return classSchedule.removed = true;
  }

  presentAlert(name) {
    const alert = this.alert.create({
      title: 'Sucesso',
      subTitle: 'Grupo '+name+' cadastrado com sucesso!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentErrorAlert(text:string) {
    const alert = this.alert.create({
      title: 'Error',
      subTitle: text,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
