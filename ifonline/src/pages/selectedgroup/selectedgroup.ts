import { Component } from '@angular/core';
import { NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GroupService } from '../../app/services/groups.service';

@Component({
  selector:'selected-group',
  templateUrl:'selectedgroup.html'
})

export class SelectedGroupPage {

  group:any={admin:{},proof:[],students:[]};
  idGroup:string='';
  idLoggedUser:string='';
  isOwner:boolean=false;
  isMember:boolean=false;
  token:string='';
  isTeacher:boolean=false;

  constructor(
    private navParams: NavParams,
    private groupService: GroupService, 
    private storage:Storage,
    private alertCtrl:AlertController,
    private loadingCtrl:LoadingController
  ) 
  {
      
  }

  ngOnInit() {
    this.storage.get('token')
      .then((token) => {
        this.token = token;
        this.idGroup = this.navParams.data.idGroup;
        this.idLoggedUser = this.navParams.data.idLoggedUser;
        this.isTeacher = this.navParams.data.isTeacher;
        this.loadGroup();
      })
      .catch( err => {
        console.log("erro no ngOnInit(): ",err);
      })
  }

  loadGroup() {
    this.groupService.loadFullInformationGroup(this.token,this.idGroup)
      .subscribe(result => {

        if(result.admin._id === this.idLoggedUser) {
          this.group = result;
          this.isOwner = true;
        } else {
          this.group = result;
          this.isOwner = false;
        }

        const data = result.students.filter( el => el._id === this.idLoggedUser);

        if(data.length) {
          this.isMember = true;
        } else {
          this.isMember = false;
        }

        console.log("retorno do map: ",data);

      }, err => {
        console.log("erro ao buscar grupo full: ",err);
      })
  }

  addStudent() {
    let loading = this.loadingCtrl.create({content:'Carregando...'});

    loading.present();

    this.groupService.addStudent(this.token,this.idLoggedUser,this.idGroup)
      .subscribe(result => {
        this.loadGroup();
        loading.dismiss();
        this.presentSuccessAlert('Seja Bem-vindo ao grupo! :D');
      }, err => {
        loading.dismiss();
        console.log("erro ao entrar no grupo: ",err);
        this.presentErrorAlert('não foi possível entrar no grupo');
      })
  }

  removeStudent() {
    let loading = this.loadingCtrl.create({content:'Carregando...'});

    loading.present();

    this.groupService.removeStudent(this.token,this.idLoggedUser,this.idGroup)
      .subscribe(result => {
        this.loadGroup();
        loading.dismiss();
        this.presentSuccessAlert('Você saiu do grupo! :(');
      }, err => {
        loading.dismiss();
        console.log("erro ao entrar no grupo: ",err);
        this.presentErrorAlert('não foi possível entrar no grupo');
      })
  }

  removeGroup() {
    console.log('ação para remover grupo');
  }

  addProva() {
    console.log("adicionando prova");
    const alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'subjects',
          placeholder: 'Assuntos'
        },
        {
          name: 'dateProof',
          placeholder: 'Data',
          type: 'date'
        },
        {
          name: 'value',
          placeholder: 'Valor total',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Cadastrar',
          handler: data => {
              console.log("enviado no handler cadastrar:",data);
          }
        }
      ]
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

  presentSuccessAlert(text:string) {
    const alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: text,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  
}