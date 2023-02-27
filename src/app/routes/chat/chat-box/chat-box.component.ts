import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  messageArray:Array<any> = [];
  message:any;
  chatDetails:any;
  @Input() chatId: any;
  @Input() chatHistory:any;
  userDetails:any;
  @Input() userName:any;
  @Input() clientId:any;
  isTyping:any =  false;
  @ViewChild('inputFile') public inputFile: ElementRef;
  constructor(public chatService: ChatService) {
    this.userDetails = localStorage.getItem('userDetails');
    this.userDetails =  JSON.parse(this.userDetails);
    let self = this;
    // this.chatService.newUserJoin().subscribe((data:any)=>{
    //   self.messageArray.push(data);
    // });
    // this.chatService.userLeave().subscribe((data:any)=> {
    //   self.messageArray.push(data);
    // });
    // this.chatService.message().subscribe((data:any)=> {
    //   self.messageArray.push(data);
    // });
    this.messageTyping();
    this.messageStopTyping();
   }

  ngOnInit(): void {
    this.getChatDetails();
  }

  getChatDetails() {
    this.chatService.chatDetailsEmit.subscribe(data=>{
      this.chatDetails = data;
      if(this.chatDetails._id){
        this.chatId = this.chatDetails._id;
        this.getChatHistory(this.chatDetails._id)
      }
    });
  }

  getChatHistory(chatId: any){
    this.chatService.getChatHistory(chatId).subscribe({next:res=>{
      if(res.status === 'Success') {
        console.log(res.data);
        this.chatHistory = res.data ? res.data : [];
      }
    },error:err=>{console.log(err)}});
  }
  sendMessage() {
  //  this.chatService.sendMessage({user:this.userName, room:'myGroup', message:this.message})
     if(this.message){
      this.chatService.saveMessage({chatId:this.chatId,content:this.message}).subscribe({next:res=>{
        if(res.status === 'Success') {
            this.chatService.newMessage(res.data);
            this.chatHistory.push(res.data)
        }
      },error:err=>{console.log(err)}});
      }
  }

  messageTyping(){
    this.chatService.messageTyping().subscribe(res=>{
      this.isTyping = res;
    });
  }

  messageStopTyping(){
    this.chatService.messageStopTyping().subscribe(res=>{
      this.isTyping = res;
    });
  }

  emitTyping(type:any){
      if(this.clientId){
        this.chatService.emitMessageType(type,this.clientId);
      }
  }
  uploadMedia(){
    this.inputFile.nativeElement.click();
  }
}
