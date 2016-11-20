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
          icon: "medical"
      }, {
          name: "Hausrat",
          icon: "medical"
      }];

      this.offerings = [{
          name: "Unfall",
          icon: "medical",
          price: 100
      }, {
          name: "Rechtschutz",
          icon: "medical",
          price: 100
      }, {
          name: "Mobilschutz",
          icon: "medical",
          price: 100
      }, {
          name: "Hausrat",
          icon: "medical",
          price: 100
      }, {
          name: "Haftpflicht",
          icon: "medical",
          price: 100
      }, {
          name: "Gebaeude",
          icon: "medical",
          price: 100
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
