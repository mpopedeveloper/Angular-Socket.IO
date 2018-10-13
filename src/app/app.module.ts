import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ChatService} from './chat.service';
import {WebsocketService} from './websocket.service';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TwitterComponent } from './twitter/twitter.component';
import { MongoComponent } from './mongo/mongo.component';

export const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'mongo', component: MongoComponent},
  {path: 'twitter', component: TwitterComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    HomeComponent,
    NavigationComponent,
    TwitterComponent,
    MongoComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [
    ChatService,
    WebsocketService
  ],
  bootstrap: [NavigationComponent]
})
export class AppModule { }
