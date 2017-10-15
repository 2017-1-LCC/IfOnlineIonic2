import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GroupService } from '../../app/services/groups.service';
import { ProfileService } from '../../app/services/profile.service';
import { Storage } from "@ionic/storage";
import { SelectedOneGroupPage } from '../selectedgroup/selectedOneGroup';
import { LoginPage } from '../login/login';

@Component({
  selector: 'GroupsPage',
  templateUrl: 'groups.html'
})
export class GroupsPage {

  loggedUser:any={_id:'', username:'', user:{typeUser:''}, groups:[]};
  token:string;
  groups:any=[];

  constructor(private navCtrl: NavController, private navParams: NavParams, 
    private groupsService: GroupService, private storage: Storage,
      private profileService: ProfileService) {

  }

  ionViewDidLoad() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.storage.get('token')
      .then((token) => {
        this.token = token;
        this.loadGroups(this.token);
        this.loadProfile(this.token); 
      })
      .catch( err => {
        console.log("erro no ngOnInit(): ",err);
      })
  }

  selectGroup(group) {
    this.navCtrl.push(SelectedOneGroupPage,{
      idGroup:group._id,
      idLoggedUser:this.loggedUser._id,
    });
  }

  loadGroups(token) {
    this.groupsService.loadGroups(token)
      .then(result => {
        this.groups = result;
      }, err => {
        console.log("deu erro no groups: ",err);
      })
  }

  loadProfile(token) {
    this.profileService.loadProfile(token)
      .then(result => {
        this.loggedUser = result;
      }, err => {
        this.storage.remove('token');
        this.loggedUser = null;
        this.navCtrl.push(LoginPage);
        console.log("erro ao carregar profile: ",err);
      })
  }

}
