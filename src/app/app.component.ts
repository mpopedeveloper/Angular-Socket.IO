import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
/**View the ChatService file to see the logic */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  rooms: string[] = ['room1', 'room2', 'room3'];
  constructor(private chat: ChatService) { }

  ngOnInit() {
    // this.chat.messages.subscribe(msg => {
    //   console.log(msg);
    // });
    this.chat.events.subscribe(event => {
      if (!event.hasOwnProperty('clients')) {
        console.log(event);
      }
      // console.log(event);
    });
  }

  joinRoom(room: string) {
    this.chat.joinRoom(room);
  }

  sendMessage() {
    this.chat.sendMsg('Test Message');
  }

  sendEvent() {
    this.chat.sendEvent();
  }

}
