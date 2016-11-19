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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.data = this.navParams.get('data');
      this.kpi1 = 4;
      this.kpi2 = 1;
      this.kpi3 = 5;
  }

  log(data) {
      console.log(data);
  }

}
