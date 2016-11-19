import { Component } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the Start page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    let login = JSON.parse(localStorage.getItem("loggedIn"));
    if(login) {
      this.navCtrl.push(TabsPage, {});
    }
  }

  ionViewDidLoad() {
    console.log('Hello StartPage Page');
  }

  openModal() {
    let modal = this.modalCtrl.create(ModalContentPage);
    modal.present();
  }

  goToHome() {
    localStorage.setItem("loggedIn", "true");
  	this.navCtrl.push(TabsPage, {});
  }
}

@Component({
	templateUrl: '../login/login.html'
})

export class ModalContentPage {

	constructor(
		public platform: Platform,
		public params: NavParams,
		public viewCtrl: ViewController,
		public navCtrl: NavController
	) {}

	goToHome() {
  	this.navCtrl.push(TabsPage, {});
  }

	dismiss() {
		this.viewCtrl.dismiss();
	}
}
