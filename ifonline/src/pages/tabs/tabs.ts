import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { GroupsPage } from '../groups/groups';
import { HomePage } from '../home/home';
import { TimelinePage } from '../timeline/timeline'; 
import { NavParams } from 'ionic-angular';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root:any = HomePage;
  tab2Root:any = GroupsPage;
  tab3Root:any = TimelinePage;
  tab4Root:any = AboutPage

  constructor(navParams:NavParams) {
    
  }

}
