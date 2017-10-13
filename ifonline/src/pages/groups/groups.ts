import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GroupService } from '../../app/services/groups.service';

@Component({
  selector: 'GroupsPage',
  templateUrl: 'groups.html'
})
export class GroupsPage {

  token:string;
  groups:any=[];

  constructor(public navCtrl: NavController, public navParams:NavParams, public groupsService:GroupService) {
    this.token = this.navParams.data.token;
    console.log("Token: ",this.token);
  }

  ngOnInit() {
    this.groupsService.loadGroups(this.token)
      .then(result => {
        this.groups = result;
        console.log("info de groups carregadas: ",this.groups);
      }, err => {
        console.log("deu erro no groups: ",err);
      })
  }

  getGroups(evt) {
    console.log("evento: ",evt);
  }

}
