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
          message: "Hello, how may I help you?"
      }];
  }

  sendMessage(input: string) {
    if(input != "" && input != undefined) {
      this.messages.push({
          align: "right",
          message: input
      })
    }

      this.messageInput = "";
  }

}
