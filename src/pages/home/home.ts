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
    private model = {
    	currentPolicies: this.currentPolicies,
    	offerings: this.offerings
    }

  constructor(public navCtrl: NavController, public policyService: PolicyService) {
      this.currentPolicies = [{
          name: "Unfall",
          icon: "medkit"
      }, {
          name: "Hausrat",
          icon: "ios-home-outline"
      }];

      this.offerings = [{
          name: "Unfall",
          icon: "medkit"
      }, {
          name: "Rechtschutz",
          icon: "briefcase"
      }, {
          name: "Mobilschutz",
          icon: "phone-portrait"
      }, {
          name: "Hausrat",
          icon: "ios-home-outline"
      }, {
          name: "Haftpflicht",
          icon: "medical"
      }, {
          name: "Gebaeude",
          icon: "home"
      }];

      this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

      this.policyService = policyService;
      this.loadPolicies();
  }

  goToPage(data, policies) {
    this.navCtrl.push(DetailPage, {
        data: data,
        policies: policies
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
