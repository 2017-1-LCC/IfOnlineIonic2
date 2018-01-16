import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { TimelineService } from '../../app/services/timeline.service'; 
import { GroupService } from '../../app/services/groups.service';
import { ProfileService } from '../../app/services/profile.service';
import { SelectedGroupPage } from '../selectedgroup/selectedgroup';
import { LoginPage } from '../login/login';

@Component({
  selector: 'TimelinePage',
  templateUrl:'timeline.html'
})
export class TimelinePage {

  token:any;
  itens:any;
  loggedUser:any={_id:'', username:'', user:{typeUser:''}, groups:[]};
  isTeacher:boolean;

  constructor
  (
    private timelineService: TimelineService,
    private groupService: GroupService,
    private storage:Storage,
    private navCtrl: NavController, 
    private profileService: ProfileService
  )   {   }

  ngOnInit() {
    this.storage.get('token')
      .then((token) => {
        this.token = token;
        this.loadTimeline();
        this.loadProfile(); 
      })
      .catch( err => {
        console.log("erro no ngOnInit(): ",err);
      })
  }

  ionViewWillEnter() {
    this.loadTimeline();
  }

  loadTimeline() {
    this.timelineService.loadTimeline(this.token)
      .subscribe(result => {
        this.itens = result;
        //console.log("resultado do load: ",result);
      })
  }

  selectGroup(idGroup) {
    this.groupService.loadFullInformationGroup(this.token, idGroup)
      .subscribe(group => {
        this.navCtrl.push(SelectedGroupPage,{
          idGroup:group._id,
          idLoggedUser:this.loggedUser._id,
          isTeacher:this.isTeacher
        });
        //console.log("group encontrado!",group);
      }, err => {
        console.log("erro ao buscar grupo ",err);
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