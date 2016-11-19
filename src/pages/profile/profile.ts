import { Component, Input } from '@angular/core';
import { StartPage } from '../start/start';
import {AccountService} from '../../providers/account-service';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [AccountService]
})
export class ProfilePage {

    private loggedIn;
    private account = {};
    @Input() private FirstName;
    private LastName = "Mustermann";

  constructor(public navCtrl: NavController, public peopleService: AccountService) {
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

    this.loadAccount();
  }

  logout() {
      localStorage.setItem("loggedIn", "false");
      location.reload();

  }

  loadAccount() {
    this.peopleService.load()
    .then(data => {
      this.account = data;
    });
  }

}
