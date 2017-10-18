import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GroupService } from '../../app/services/groups.service';
import { ProfileService } from '../../app/services/profile.service';
import { Storage } from "@ionic/storage";
import { SelectedGroupPage } from '../selectedgroup/selectedgroup';
import { LoginPage } from '../login/login';

@Component({
  selector: 'GroupsPage',
  templateUrl: 'groups.html'
})
export class GroupsPage {

  loggedUser:any={_id:'', username:'', user:{typeUser:''}, groups:[]};
  token:string='';
  groups:any=[];
  isTeacher:boolean;

  constructor(
    private navCtrl: NavController, 
    private groupsService: GroupService, 
    private storage: Storage,
    private profileService: ProfileService
  ) 
  {

  }

  ngOnInit() {
    this.storage.get('token')
      .then((token) => {
        this.token = token;
        this.loadGroups();
        this.loadProfile(); 
      })
      .catch( err => {
        console.log("erro no ngOnInit(): ",err);
      })
  }

  selectGroup(group) {
    this.navCtrl.push(SelectedGroupPage,{
      idGroup:group._id,
      idLoggedUser:this.loggedUser._id,
      isTeacher:this.isTeacher
    });
  }

  loadGroups() {
    this.groupsService.loadGroups(this.token)
      .subscribe(result => {
        this.groups = result;
      }, err => {
        console.log("deu erro no groups: ",err);
      })
  }

  loadProfile() {
    this.profileService.loadProfile(this.token)
      .subscribe(result => {
        this.loggedUser = result;
        if(this.loggedUser.user.typeUser === 'TEACHER') {
          this.isTeacher = true;
        } else {
          this.isTeacher = false;
        }
      }, err => {
        this.storage.remove('token');
        this.loggedUser = null;
        this.navCtrl.push(LoginPage);
        console.log("erro ao carregar profile: ",err);
      })
  }

}
