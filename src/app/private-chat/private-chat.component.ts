import { Component, OnInit } from '@angular/core';
import { ChatAppService } from '../chat-app.service';
import { take } from 'rxjs/operators';
import { Room } from '../models/room.model';
import { Observable, Subscription } from 'rxjs';
import { Message } from '../models/message.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit {

  sender: string = "shakil";
  receiver: string = "shifa";
  $messageList: any;
  messageList: Array<Message>;
  message: string;
  room: Room;
  subscription: Subscription

  constructor(public chatService: ChatAppService) { }

  ngOnInit(): void {
  }

  async getMessages() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.messageList = [];
    this.room = await this.chatService.createRoom([this.sender, this.receiver])
      .pipe(take(1))
      .toPromise();

    this.$messageList = Observable.create(observer => {
      const eventSource = new EventSource(`${environment.baseEndPointUrl}api/chat/message/room/${this.room.chatRoomId}`);
      eventSource.addEventListener("message", (event: MessageEvent) => observer.next(JSON.parse(event.data)));
      eventSource.addEventListener("error", (event: MessageEvent) => observer.error(event));
      return () => {
        eventSource.close();
      };
    });

    this.subscription = this.$messageList
      .subscribe(data => {
        console.log(data);
        data.timeStamp = new Date(data.timeStamp);
        this.messageList.push(data as Message);
      })
  }

  async postMessage() {
    const message: Message = {
      chatRoomId: this.room.chatRoomId,
      content: this.message,
      sentBy: this.sender,
      sentTo: this.receiver,
      timeStamp: new Date()

    }
    const messageResponse: Message = await this.chatService.postMessage(message)
      .pipe(take(1))
      .toPromise();
  }
}
