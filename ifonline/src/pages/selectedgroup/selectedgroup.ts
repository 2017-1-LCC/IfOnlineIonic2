import { Component } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GroupService } from '../../app/services/groups.service';
import { HomePage } from '../home/home'; 

@Component({
  selector:'selected-group',
  templateUrl:'selectedgroup.html'
})

export class SelectedGroupPage {

  group:any={admin:{},proof:[],students:[]};
  idGroup:string;
  idLoggedUser:string;
  isOwner:boolean=false;
  isMember:boolean=false;
  token:string;

  constructor(private navCtrl: NavController, private navParams: NavParams, 
    private groupService: GroupService, private storage:Storage) {
      
  }

  ngOnInit() {
    this.storage.get('token')
      .then((token) => {
        this.token = token;
        this.idGroup = this.navParams.data.idGroup;
        this.idLoggedUser = this.navParams.data.idLoggedUser;
        this.loadGroup(this.token,this.idGroup,this.idLoggedUser);
      })
      .catch( err => {
        console.log("erro no ngOnInit(): ",err);
      })
  }

  loadGroup(token, idGroup, idLoggedUser) {
    this.groupService.loadFullInformationGroup(this.token,idGroup)
      .then(result => {

        if(result.admin._id === idLoggedUser) {
          this.group = result;
          this.isOwner = true;
        } else {
          this.group = result;
          this.isOwner = false;
        }

        const data = result.students.map( el => el._id === idLoggedUser);

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
    this.groupService.addStudent(this.token,this.idLoggedUser,this.idGroup)
      .then(result => {
        this.navCtrl.push(HomePage);
      }, err => {
        console.log("erro ao entrar no grupo: ",err);
      })
  }

  removeStudent() {
    this.groupService.removeStudent(this.token,this.idLoggedUser,this.idGroup)
      .then(result => {
        this.navCtrl.push(HomePage);
      }, err => {
        console.log("erro ao entrar no grupo: ",err);
      })
  }

  selectTab(index: number) {
      var t: Tabs = this.navCtrl.parent;
      t.select(index);
  }

  addProva() {
    console.log("adicionando prova");
  }
  
}