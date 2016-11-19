import { Component } from '@angular/core';
import { ChatService } from '../../providers/chat-service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [ChatService]
})
export class ChatPage {

  private messages = [];
  private messageInput;
  private context = undefined;

  constructor(public navCtrl: NavController, public chatService: ChatService) {
    this.init();
  }

  init() {
    let input = "Hello";
    if(input != "" && input != undefined) {
      this.chatService.sendMessage({
        message: input,
        context: ""
      }).then(data => {
        console.log(data);
        this.context = data.context;
        let tmp = data.output.text;
        for (let j in tmp) {
          this.messages.push({
            align: "left",
            message: tmp[j]
          })
        }
      })
    }

      this.messageInput = "";
  }

  sendMessage(input: string) {
    if(input != "" && input != undefined) {
      this.chatService.sendMessage({
        message: input,
        context: this.context
      }).then(data => {
        console.log(data);
        this.context = data.context;
        let tmp = data.output.text;
        for (let j in tmp) {
          this.messages.push({
            align: "left",
            message: tmp[j]
          })
        }
      })
      this.messages.push({
          align: "right",
          message: input
        })
    }

      this.messageInput = "";
  }

}
