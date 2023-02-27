import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { InboxComponent } from './inbox/inbox.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from 'src/app/modals/modals.module';

@NgModule({
  declarations: [
    InboxComponent,
    ChatBoxComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalsModule,
  ]
})
export class ChatModule { }
