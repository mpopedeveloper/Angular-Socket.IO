import { Component, OnInit, OnDestroy } from '@angular/core';
import {ChatService} from '../chat.service';
/**View the ChatService file to see the logic */
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {
 clients: any;
  constructor(private chat: ChatService) { }

  ngOnInit() {
    // this.clientConnected();
    this.chat.events.subscribe(event => {
      this.clients = event.clients;
    });
  }

  ngOnDestroy() {
    // this.clientConnected();
    this.chat.events.subscribe(event => {
      this.clients = event.clients;
    });
  }

  // clientConnected() {
  //   this.chat.clientConnected();
  // }

  // clientDisconnected() {
  //   this.chat.clientDisconnected();
  // }

}
