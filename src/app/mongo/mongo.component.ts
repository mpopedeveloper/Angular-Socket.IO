import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-mongo',
  templateUrl: './mongo.component.html',
  styleUrls: ['./mongo.component.css']
})
export class MongoComponent implements OnInit {
/**View the ChatService file to see the logic */
  constructor(private chat: ChatService) { }
  product: any;
  ngOnInit() {
    this.getProductData();
    this.chat.events.subscribe(event => {
      console.log(event);
      this.product = event;
    });
  }

  getProductData() {
  this.chat.getProductData();
  }

}
