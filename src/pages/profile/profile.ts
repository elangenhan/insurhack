import { Component } from '@angular/core';
import { StartPage } from '../start/start';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

    private loggedIn;

  constructor(public navCtrl: NavController) {
      console.log(localStorage.getItem("loggedIn"));
    if(localStorage.getItem("loggedIn") == "true") {
        this.loggedIn = true;
    } else {
        this.loggedIn = false;
    }
    if (this.loggedIn == false) {
        console.log("not logged in");
        this.logout();
    }
  }

  logout() {
      localStorage.setItem("loggedIn", "false");
      location.reload();

  }

}
