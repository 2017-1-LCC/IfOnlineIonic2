import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Storage } from "@ionic/storage";

import { ProfileService } from '../../app/services/profile.service';
import { CreateGroupPage } from '../creategroup/creategroup';
import { SelectedGroupPage } from '../selectedgroup/selectedgroup';
import { EditUserPage } from '../edituser/edituser';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loggedUser:any={_id:'', username:'', user:{typeUser:''}, groups:[]};
  token:string;
  isTeacher:boolean;

  constructor(
    private navCtrl: NavController, 
    private profileService:ProfileService,
    private storage: Storage,
    private app:App
  ) {  }

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
        this.navCtrl.setRoot(LoginPage);
        console.log("erro ao carregar profile: ",err);
      })
  }

  selectGroup(group) {
    if(this.loggedUser.user.typeUser === 'TEACHER') {
      this.isTeacher = true;
    } else {
      this.isTeacher = false;
    }

    this.navCtrl.push(SelectedGroupPage,{
      idGroup:group._id,
      idLoggedUser:this.loggedUser._id,
      isTeacher:this.isTeacher
    });
  }

  editProfile() {
    //console.log("click em configurações",this.loggedUser);
    const data = {
      username:this.loggedUser.user.username,
      name:this.loggedUser.name,
      email:this.loggedUser.email,
      birthDate:this.loggedUser.birthDate,
      _id:this.loggedUser.user._id,
      idOther:this.loggedUser._id
    }
    this.navCtrl.push(EditUserPage,{
      user:data
    });
  }

  logout() {
    this.storage.remove('token');
    this.loggedUser = {_id:'', username:'', user:{typeUser:''}, groups:[]};
    this.token = null;
    this.app.getRootNav().setRoot(LoginPage);
  }

  newGroup() {
    this.navCtrl.push(CreateGroupPage,this.loggedUser._id);
  }

}
