import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

    private data;
    private kpi1;
    private kpi2;
    private kpi3;
    private policies;
    private coverages: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.data = this.navParams.get('data');
      this.policies = this.navParams.get('policies');
      this.kpi1 = 4;
      this.kpi2 = 1;
      this.kpi3 = 5;
      this.coverages = this.policies.Unfall.InsuredPersons[0].CoverageParts[0].Coverages;
      console.log(this.coverages);
    }

  log(data) {
      console.log(data);
  }

}
