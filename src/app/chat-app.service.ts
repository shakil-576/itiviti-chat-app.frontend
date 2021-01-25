import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Room } from './models/room.model';
import { Message } from './models/message.model';
import { User } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatAppService {

  constructor(public http: HttpClient) { }

  createRoom(participantsIds: Array<string>): Observable<Room> {
    return this.http.put<Room>(`${environment.baseEndPointUrl}api/chat/createRoom`, participantsIds);
  }

  postMessage(message: Message): Observable<any> {
    return this.http.post(`${environment.baseEndPointUrl}api/chat/message/create`, message);
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseEndPointUrl}api/chat/user/list`);
  }

}
