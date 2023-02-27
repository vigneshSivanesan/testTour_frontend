import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VideoChatComponent } from './video-chat/video-chat.component';

@NgModule({
  declarations: [
    ContactListComponent,
    VideoChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  entryComponents:[
    ContactListComponent,
    VideoChatComponent
  ]

})
export class ModalsModule { }
