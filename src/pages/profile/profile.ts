import { Component } from '@angular/core';
import { StartPage } from '../start/start';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController) {

  }

  logout() {
      localStorage.setItem("loggedIn", "false");
      location.reload();

  }

}
