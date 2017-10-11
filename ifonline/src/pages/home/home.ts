import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ProfileService } from '../../app/services/profile.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userDetails:Object={};
  loggedUser:Object={user:{}};

  constructor(public navParams:NavParams, public profileService:ProfileService) {
    this.userDetails = this.navParams.data;
  }

  ngOnInit() {
    this.profileService.loadProfile(this.userDetails)
      .then(result => {
        this.loggedUser = result;
        console.log("info do user logado: ",this.loggedUser);
      }, err => {
        console.log("erro ao carregar profile: ",err);
      })
  }

}
