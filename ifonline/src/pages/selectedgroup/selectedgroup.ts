import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
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

  constructor(
    private navParams: NavParams,
    private groupService: GroupService, 
    private storage:Storage,
  ) 
  {
      
  }

  ngOnInit() {
    this.storage.get('token')
      .then((token) => {
        this.token = token;
        this.idGroup = this.navParams.data.idGroup;
        this.idLoggedUser = this.navParams.data.idLoggedUser;
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
    this.groupService.addStudent(this.token,this.idLoggedUser,this.idGroup)
      .subscribe(result => {
        this.loadGroup();
      }, err => {
        console.log("erro ao entrar no grupo: ",err);
      })
  }

  removeStudent() {
    this.groupService.removeStudent(this.token,this.idLoggedUser,this.idGroup)
      .subscribe(result => {
        this.loadGroup();
      }, err => {
        console.log("erro ao entrar no grupo: ",err);
      })
  }

  addProva() {
    console.log("adicionando prova");
  }
  
}