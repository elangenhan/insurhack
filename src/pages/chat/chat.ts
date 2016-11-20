import { Component, ViewChild } from '@angular/core';
import { ChatService } from '../../providers/chat-service';
import { NavController } from 'ionic-angular';
import { Content } from 'ionic-angular';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [ChatService]
})
export class ChatPage {

  private messages = [];
  private messageInput;
  private context = {};

  @ViewChild(Content) content: Content;

  scrollToBottom() {
    this.content.scrollToBottom(0);
    let content = this.content;
    setTimeout(function() {
      content.scrollToBottom(0);
    }, 50);
    setTimeout(function() {
      content.scrollToBottom(0);
    }, 200);
  }

  constructor(public navCtrl: NavController, public chatService: ChatService) {
    this.init();
  }

  init() {
      this.chatService.sendMessage({
        message: "Hello",
        context: {}
      }).then( (data: any) => {
        console.log(data);
        this.context = data.context;
        let tmp = data.output.text;
        for (let j in tmp) {
          this.messages.push({
            align: "left",
            message: tmp[j]
          })
          this.scrollToBottom();
        }
        this.scrollToBottom();
      })
  }

  sendMessage(input: string) {
    this.scrollToBottom();
    if(input != "" && input != undefined) {
      this.chatService.sendMessage({
        message: input,
        context: this.context
      }).then((data: any) => {
        console.log(data);
        this.context = data.context;
        let tmp = data.output.text;
        for (let j in tmp) {
          this.messages.push({
            align: "left",
            message: tmp[j]
          })
          this.scrollToBottom();
        }
        this.scrollToBottom();
      })
      this.messages.push({
          align: "right",
          message: input
        });
      this.scrollToBottom();
    }

      this.messageInput = "";
  }

}
