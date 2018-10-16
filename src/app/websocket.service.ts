import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import * as Rx from 'rxjs';
import {environment} from '../environments/environment';

/**
 * This class handles all socket.io events between the server and client.
 */
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
private socket =  io(environment.ws_url); // socket that connects to our socket.io server

  constructor() { }

  // connect(): Rx.Subject<MessageEvent> {
  //   const Observable$ = new Observable(observer => {
  //     this.socket.on('message', (data) => {
  //       console.log('Recieved a message from websocket');
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });

  //   const observer1 = {
  //     next: (data: Object) => {
  //       this.socket.emit('message', JSON.stringify(data));
  //     },
  //   };

  //   return Rx.Subject.create(observer1, Observable$);
  // }

  /**The following functions are all listening for specific events to be emited from the server
   * Upon an event being found from the server, and observable is created and passed to the component.
   */
  connect() {
    const Observable$ = new Observable(observer => {
      this.socket.on('event', (data) => {
        observer.next(data);
      });

      this.socket.on('joined room1', (data) => {
        observer.next(data);
      });

      this.socket.on('joined room2', (data) => {
        observer.next(data);
      });

      this.socket.on('joined room3', (data) => {
        observer.next(data);
      });

      this.socket.on('client connected', (data) => {
        observer.next(data);
      });

      this.socket.on('client disconnected', (data) => {
        observer.next(data);
      });

      this.socket.on('chat message response', (data) => {
        observer.next(data);
      });

      this.socket.on('tweet', (data) => {
        console.log('tweet');
        observer.next(data);
      });

      this.socket.on('product retrieved', (data) => {
        console.log(data);
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });

    const observer1 = {
      next(data: Object) {
        console.log('Nothing');
      }
    };

    return Rx.Subject.create(observer1, Observable$);
  }

  joinRoom(room: string) {
    this.socket.emit('join ' + room);
  }

  emit() {
    this.socket.emit('event', {payload: 'Sent message to server'});
  }

  activateTwitterFeed() {
    console.log('debug');
    this.socket.emit('activate twitter feed', {payload: 'Activating twitter feed!'});
  }

  getProductData() {
    console.log('debug');
    this.socket.emit('get product data', {payload: 'Fetch product data'});
  }

  incrementProductQuantity() {
    this.socket.emit('increment product quantity');
  }

  decrementProductQuantity() {
    this.socket.emit('decrement product quantity');
  }

  chatMessage(msg) {
    this.socket.emit('chat message', msg);
  }
}
