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

  constructor(public navCtrl: NavController) {
      this.currentPolicies = [{
          name: "Life Insurance",
          icon: "medical"
      }, {
          name: "Health Care",
          icon: "medical"
      }];

      this.offerings = [{
          name: "Life Insurance",
          icon: "medical"
      }, {
          name: "Health Care",
          icon: "medical"
      }, {
          name: "Indemnity Insurance",
          icon: "medical"
      }];
  }

  goToPage(data) {
    this.navCtrl.push(DetailPage, {
        data: data
    });
  }

}
