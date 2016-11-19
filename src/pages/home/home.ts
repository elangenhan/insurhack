import { Component } from '@angular/core';
import { DetailPage } from '../detail/detail';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    private currentPolicies;
    private offerings;
    private loggedIn;

  constructor(public navCtrl: NavController) {
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

      localStorage.setItem("loggedIn", "true");

      this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  }

  goToPage(data) {
    this.navCtrl.push(DetailPage, {
        data: data
    });
  }

}
