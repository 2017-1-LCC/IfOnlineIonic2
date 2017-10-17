import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

import { ProfileService } from '../../app/services/profile.service';
import { CreateGroupPage } from '../creategroup/creategroup';
import { SelectedGroupPage } from '../selectedgroup/selectedgroup';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loggedUser:any={_id:'', username:'', user:{typeUser:''}, groups:[]};
  token:string;

  constructor(private navCtrl: NavController, private profileService:ProfileService,
    private storage: Storage) {

  }

  ionViewWillEnter() {
    this.storage.get('token')
      .then((token) => {
        this.token = token;
        this.loadProfile();
        console.log("load profile...");
      })
      .catch( err => {
        console.log("erro no ngOnInit(): ",err);
      })
  }

  loadProfile() {
    this.profileService.loadProfile(this.token)
      .subscribe(result => {
        this.loggedUser = result;
      }, err => {
        this.storage.remove('token');
        this.loggedUser = null;
        this.navCtrl.push(LoginPage);
        console.log("erro ao carregar profile: ",err);
      })
  }

  selectGroup(group) {
    this.navCtrl.push(SelectedGroupPage,{
      idGroup:group._id,
      idLoggedUser:this.loggedUser._id,
    });
  }

  logout() {
    this.storage.remove('token');
    this.loggedUser = {_id:'', username:'', user:{typeUser:''}, groups:[]};
    this.token = null;
    this.navCtrl.setRoot(LoginPage);
  }

  newGroup() {
    this.navCtrl.push(CreateGroupPage,this.loggedUser._id);
  }

}
