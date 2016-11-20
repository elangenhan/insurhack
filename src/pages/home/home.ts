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
    private model: any;

  constructor(public navCtrl: NavController, public policyService: PolicyService) {
      this.currentPolicies = [{
          name: "Accident",
          icon: "medkit"
      }, {
          name: "Home",
          icon: "ios-home-outline"
      }];

      this.offerings = [{
          name: "Accident",
          icon: "medkit"
      }, {
          name: "Legal Cost",
          icon: "briefcase"
      }, {
          name: "Mobile Protection",
          icon: "phone-portrait"
      }, {
          name: "Home",
          icon: "ios-home-outline"
      }, {
          name: "General Liability",
          icon: "medical"
      }, {
          name: "Building",
          icon: "home"
      }];

      this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

      this.policyService = policyService;
      this.loadPolicies();
      this.model = "offerings";
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
