import { Component, OnInit } from '@angular/core';
import { ContactListComponent } from 'src/app/modals/contact-list/contact-list.component';
 import { MatDialog } from '@angular/material/dialog';
 import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from 'src/app/services/chat.service';
import { VideoChatComponent } from 'src/app/modals/video-chat/video-chat.component';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  ChatUserDetails:any;
  currentChat: any;
  userDetails: any;
  isSocketConnected:any;
  chatName:any;
  chatDetails: any;
   constructor(public modal: NgbModal, public chatService: ChatService ) {
    this.userDetails = localStorage.getItem('userDetails');
    this.userDetails =  JSON.parse(this.userDetails);
    this.chatService.setupSocket(this.userDetails);
    this.socketConnected();
    }

  ngOnInit(): void {
    this.getselectedChatDetails()
  }

  getselectedChatDetails(){
    this.chatService.selectedChatDetailsEmit.subscribe(res=>{
          this.getCurrentChatDetails(res);
    });
  }

  contactListPopup() {
    const modal = this.modal.open(ContactListComponent, {
      windowClass:'contactList-popup custom-modal'
    });
    modal.result.then(emittedValue=>{
       if(emittedValue){
        this.currentChat = emittedValue;
         this.getCurrentChatDetails(emittedValue);
        this.chatService.sendChatDetails(this.currentChat);
       }
    });
  }
  getCurrentChatDetails(chatDetails:any){
    this.chatDetails = chatDetails;
    if(chatDetails && chatDetails.users){
      if(chatDetails.isGroupChat){
        this.chatName =  chatDetails.chatName
      } else {
        chatDetails.users.forEach((user:any)=>{
          if(user._id !== this.userDetails._id){
            this.ChatUserDetails =  user;
            this.chatName = user.name;
          }
        });
      }

  }
  }
  socketConnected(){
    this.chatService.socketConnected().subscribe({next:res=>{
       this.isSocketConnected =  res;
       console.log('socket', res)
    }, error:err=>{console.log(err)}})
  }

  openVideo(){
    let clientId:any = []
    if(this.chatDetails && this.chatDetails.users){
      this.chatDetails.users.forEach((user:any)=>{
        if(user._id !== this.userDetails._id){
          clientId.push(user._id);
        }
      });
  }
    const modal = this.modal.open(VideoChatComponent, {
      windowClass:'videoChat-popup custom-modal'
    });
    modal.componentInstance.userIds =  clientId
    modal.result.then(emittedValue=>{
       if(emittedValue){
       }
    });
  }
}
