import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  private messages;
  private messageInput;

  constructor(public navCtrl: NavController) {
      this.messages = [{
          align: "left",
          message: "Test"
      }, {
          align: "right",
          message: "another test"
      }, {
          align: "left",
          message: "asd"
      }];
  }

  sendMessage(input: string) {
      this.messages.push({
          align: "right",
          message: input
      })

      this.messageInput = "";
  }

}
