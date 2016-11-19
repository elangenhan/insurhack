import { Component } from '@angular/core';
import { StartPage } from '../start/start';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

    private loggedIn;
    private account;
    private FirstName = "Steffen";
    private LastName = "Billings";

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

  getAccount() {
    let url = "http://localhost:3000/api/account";
    this.http.get(url)
        .subscribe(data => {
          this.account = data.json();
          this.FirstName = this.account.FirstName;
          this.LastName = this.account.LastName;
        }, error => {
            console.log(JSON.stringify(error.json()));
        });

  }

}
