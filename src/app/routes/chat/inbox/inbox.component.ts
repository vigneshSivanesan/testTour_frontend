import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  userDetails:any;
  userName: any;
chatList:any;
chatId:any;
chatHistory:any;
clientId:any;
  constructor(private chatService: ChatService) {
    this.userDetails = localStorage.getItem('userDetails');
    this.userDetails =  JSON.parse(this.userDetails);
    this.receviedMessage()
   }

  ngOnInit(): void {
   this.getChatList();
  }

  getChatList() {
    this.chatService.getChatList().subscribe({next:res=>{
      if(res.status === 'Success') {
        console.log(res.data);
        this.chatList = res.data ? res.data : [];
      }
    },error:err=>{console.log(err)}});
  }

  loadChat(chatDetails: any){
    if(chatDetails._id){
      this.chatId = chatDetails._id;
      this.chatService.sendSelectedChatDetails(chatDetails);
      this.getClientId(chatDetails);
    this.chatService.getChatHistory(chatDetails._id).subscribe({next:res=>{
      if(res.status === 'Success') {
        console.log(res.data);
        this.chatHistory = res.data ? res.data : [];
      }
    },error:err=>{console.log(err)}});
  }
  }

  getClientId(chatDetails:any){
    if(chatDetails && chatDetails.users){
      this.clientId = [];
      chatDetails.users.forEach((user:any)=>{
        if(user._id !== this.userDetails._id){
          this.clientId.push(user._id);
        }
      });
  }
}

  addUser(){
   let data={
    user: this.userName,
    room:'myGroup'
   }
   this.chatService.joinRoom(data);
  }

  receviedMessage() {
    this.chatService.messageRecived().subscribe({next:res=>{
          this.chatHistory.push(res);
    }})
  }

}
