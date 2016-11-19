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
  private context = {};

  constructor(public navCtrl: NavController, public chatService: ChatService) {
      this.init();
  }

  init() {
    this.chatService.sendMessage({
        workspace_id: '61970c56-80d8-48eb-838b-6fdd890f85b6',
        input: {'text': "Hello"},
        context: this.context
      }).then(data => {
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

  sendMessage(input: string) {
    if(input != "" && input != undefined) {
      this.chatService.sendMessage({
        workspace_id: '61970c56-80d8-48eb-838b-6fdd890f85b6',
        input: {'text': input},
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
