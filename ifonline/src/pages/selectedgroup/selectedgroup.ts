import { Component } from '@angular/core';
import { NavParams, AlertController, LoadingController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GroupService } from '../../app/services/groups.service';
import { EditGroupPage } from '../editgroup/editgroup';

@Component({
  selector:'selected-group',
  templateUrl:'selectedgroup.html'
})

export class SelectedGroupPage {

  group:any={admin:{name:'',user:{email:''}},proof:[],students:[]};
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
    private loadingCtrl:LoadingController,
    private navCtrl:NavController
  ) 
  {
      
  }

  ionViewWillEnter() {
    this.loadGroup();
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
        console.log("grupos: ",this.group);
      }, err => {
        console.log("erro ao buscar grupo full: ",err);
      })
  }

  selectStudent(student) {
    console.log("estudante selecionado: ",student);
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

  enableEditGroup() {
    this.navCtrl.push(EditGroupPage, {
      groupToEdit:this.group
    });
  }

  removeGroup() {
    console.log('ação para remover grupo');
  }

  selectProof(proof) {
    console.log("prova selecionada: ",proof);
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