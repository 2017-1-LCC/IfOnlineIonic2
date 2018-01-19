import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { IonicStorageModule, Storage } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { GroupsPage } from '../pages/groups/groups';
import { CreateUserPage } from '../pages/createuser/createuser';
import { CreateGroupPage } from '../pages/creategroup/creategroup';
import { SelectedGroupPage } from '../pages/selectedgroup/selectedgroup';
import { EditGroupPage } from '../pages/editgroup/editgroup';
import { EditUserPage } from '../pages/edituser/edituser';
import { TimelinePage } from '../pages/timeline/timeline';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ProfileService } from './services/profile.service'; 
import { GroupService } from './services/groups.service';
import { TimelineService } from './services/timeline.service';

import { orderDateByPipe } from './pipes/filter-pipe';

import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CreateUserPage,
    GroupsPage,
    CreateGroupPage,
    SelectedGroupPage,
    EditGroupPage,
    EditUserPage,
    TimelinePage,
    orderDateByPipe
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CreateUserPage,
    GroupsPage,
    CreateGroupPage,
    SelectedGroupPage,
    EditGroupPage,
    EditUserPage,
    TimelinePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    UserService,
    ProfileService,
    GroupService,
    TimelineService,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler, deps:[Storage] }
  ]
})
export class AppModule {}
