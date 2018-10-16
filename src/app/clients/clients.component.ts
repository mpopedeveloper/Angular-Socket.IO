

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';
/**View the ChatService file to see the logic */
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {
  chatMessages: string[] = [];
  clients: any = 1;
  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.events.subscribe(event => {
      if (event.hasOwnProperty('msg')) {
        this.chatMessages.push(event.msg);
      } else if (event.hasOwnProperty('clients')) {
      this.clients = event.clients;
      }
    });
  }

  ngOnDestroy() {
    this.chat.events.subscribe(event => {
      this.clients = event.clients;
    });
  }

  chatInput(input: any) {
    this.chat.chatMessage(input);
  }

}
