import { Component } from '@angular/core';
import { DetailPage } from '../detail/detail';
import { PolicyService} from '../../providers/policy-service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PolicyService]
})
export class HomePage {

    private currentPolicies;
    private offerings;
    private loggedIn;
    private policies;

  constructor(public navCtrl: NavController, public policyService: PolicyService) {
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

      this.policyService = policyService;
      this.loadPolicies();
  }

  goToPage(data) {
    this.navCtrl.push(DetailPage, {
        data: data
    });
  }

  loadPolicies() {
    this.policyService.load()
    .then(data => {
      this.policies = data;
      console.log(this.policies);
    });
  }

}
