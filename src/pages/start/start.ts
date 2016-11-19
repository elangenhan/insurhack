import { Component } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('Hello StartPage Page');
  }

  openModal() {
    let modal = this.modalCtrl.create(ModalContentPage);
    modal.present();
  }
}

@Component({
	templateUrl: '../login/login.html'
})

export class ModalContentPage {

	constructor(
		public platform: Platform,
		public params: NavParams,
		public viewCtrl: ViewController
	) {}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}
