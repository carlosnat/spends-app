import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { AccountsPage} from '../pages/accounts/accounts';
import { FriendsPage } from '../pages/friends/friends';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild('content') nav: NavController

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  closesession() {
    this.nav.setRoot(LoginPage);
  }

  viewaccount() {
    this.nav.setRoot(AccountsPage);
  }

  viewfriends() {
    this.nav.setRoot(FriendsPage);
  }

}

