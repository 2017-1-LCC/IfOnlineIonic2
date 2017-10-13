import { Component } from '@angular/core';
import { NavController , NavParams } from 'ionic-angular';
import { ProfileService } from '../../app/services/profile.service';
import { CreateGroupPage } from '../creategroup/creategroup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userDetails:Object={};
  loggedUser:Object={user:{}};
  isTeacher:boolean=false;
  info:any={_id:'',token:''}

  constructor(public navCtrl: NavController, public navParams:NavParams, public profileService:ProfileService) {
    this.userDetails = this.navParams.data;
    this.info.token = this.navParams.data.token;
    if(this.navParams.data.typeUser === 'TEACHER') {
      this.isTeacher = true;
    } 
  }

  ngOnInit() {
    this.profileService.loadProfile(this.userDetails)
      .then(result => {
        this.info._id = result._id;
        this.loggedUser = result;
      }, err => {
        console.log("erro ao carregar profile: ",err);
      })
  }

  newGroup() {
    this.navCtrl.push(CreateGroupPage,this.info);
  }

}
