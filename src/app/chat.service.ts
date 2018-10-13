import { Injectable } from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Observable, Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ChatService {

  messages: Subject<any>;
  events: Subject<any>;

  /**NOTE: Give each page its own method*/

  /**
   * This method is a middleman method that activates methods in the WebsocketService file
   * @param wsService - The service that handles creating and recieving socket.io events between the server and client.
   */
  constructor(private wsService: WebsocketService) {
    // this.messages = <Subject<any>>wsService
    // .connect()
    // .map((response: any): any => {
    //   return response;
    // });
    this.events = (wsService as any)
    .connect()
    .map((response: any) => {
      return response;
    });
   }

   joinRoom(room: string) {
     this.wsService.joinRoom(room);
   }

   sendMsg(msg) {
     this.messages.next(msg);
   }

   sendEvent() {
     this.wsService.emit();
   }

   activateTwitterFeed() {
     this.wsService.activateTwitterFeed();
   }

   getProductData() {
     this.wsService.getProductData();
   }
}
