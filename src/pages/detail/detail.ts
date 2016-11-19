import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

    private data;
    private kpi1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.data = this.navParams.get('data');
      this.kpi1 = 4;
  }

  log(data) {
      console.log(data);
  }

}
