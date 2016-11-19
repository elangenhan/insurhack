import { Component } from '@angular/core';
import { DetailPage } from '../detail/detail';
import { Http } from '@angular/http';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    private currentPolicies;
    private offerings;
    private loggedIn;

  constructor(public navCtrl: NavController, public http: Http) {
      this.currentPolicies = [{
          name: "Unfall",
          icon: "medical"
      }, {
          name: "Hausrat",
          icon: "medical"
      }];

      this.offerings = [{
          name: "Unfall",
          icon: "medical"
      }, {
          name: "Rechtschutz",
          icon: "medical"
      }, {
          name: "Mobilschutz",
          icon: "medical"
      }, {
          name: "Hausrat",
          icon: "medical"
      }, {
          name: "Haftpflicht",
          icon: "medical"
      }, {
          name: "Gebaeude",
          icon: "medical"
      }];

      this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

      this.getAccount();
  }

  goToPage(data) {
    this.navCtrl.push(DetailPage, {
        data: data
    });
  }

  getPolicies() {
    let api = "localhost:3000/api/policies";
  }

  getAccount() {
    let api = "localhost:3000/api/account";
    this.http.get(api).subscribe(data => {
      console.log(data);
    });
  }

}
