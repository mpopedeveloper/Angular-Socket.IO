import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {
  tweets = [];
/**View the ChatService file to see the logic */
  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.activateTwitterFeed();
    this.chat.events.subscribe(event => {
      console.log(event.payload);
     this.tweets.push(event.payload);
    });
  }

  activateTwitterFeed() {
    this.chat.activateTwitterFeed();
  }

}
