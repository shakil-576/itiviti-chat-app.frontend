import { Component, OnInit } from '@angular/core';
import { ChatAppService } from '../chat-app.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { Room } from '../models/room.model';

@Component({
  selector: 'app-broadcast-chat',
  templateUrl: './broadcast-chat.component.html',
  styleUrls: ['./broadcast-chat.component.scss']
})
export class BroadcastChatComponent implements OnInit {

  sender: string;
  receiverList: Array<User>;
  message: string;

  constructor(public chatService: ChatAppService) { }

  ngOnInit(): void {
    this.getUserList()
      .subscribe(data => {
        this.receiverList = data;
      })
  }

  getUserList(): Observable<User[]> {
    return this.chatService.getUserList()
      .pipe(map(user => {
        return user.filter(user => user.userName !== this.sender)
      }))
  }

  async sendMessage() {
    this.receiverList.filter(user => user.selected === true)
      .forEach(async user => {
        const room = await this.chatService.createRoom([this.sender, user.userName])
          .pipe(take(1))
          .toPromise();
        await this.postMessage(user, room);
      })

    alert("Broadcast Message Successfull");
  }

  async postMessage(user: User, room: Room) {
    const message: Message = {
      chatRoomId: room.chatRoomId,
      content: this.message,
      sentBy: this.sender,
      sentTo: user.userName,
      timeStamp: new Date()

    }
    const messageResponse: Message = await this.chatService.postMessage(message)
      .pipe(take(1))
      .toPromise();
  }

}
