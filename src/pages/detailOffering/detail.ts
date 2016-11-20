import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailOfferingPage {

    private data;
    private kpi1;
    private kpi2;
    private kpi3;
    private policies;
    private price;
    private fahrrad;
    private motorrad;
    private auto;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.data = this.navParams.get('data');
      this.policies = this.navParams.get('policies');
      this.kpi1 = 4;
      this.kpi2 = 1;
      this.kpi3 = 5;

      this.fahrrad = true;
      this.motorrad = false;
      this.auto = false;

      this.calcPrice();
  }

  calcPrice() {
    let tmp = 0;
    if(this.fahrrad) {
      tmp += 10;
    }
    if(this.motorrad) {
      tmp += 200;
    }
    if(this.auto) {
      tmp += 600;
    }
    this.price = tmp;
  }

  log(data) {
      console.log(data);
  }

}
