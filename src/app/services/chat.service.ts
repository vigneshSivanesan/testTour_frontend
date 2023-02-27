import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import * as io from 'socket.io-client';
import { API } from '../utils/constant';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io.io('http://localhost:3200')

   chatSource = new BehaviorSubject<any>('');
   selectedChat =  new BehaviorSubject<any>('');
   chatDetailsEmit = this.chatSource.asObservable();
   selectedChatDetailsEmit  = this.selectedChat.asObservable();
  constructor(public http: HttpClient) { 

  }

  sendChatDetails(chatDetails:any) {
    this.chatSource.next(chatDetails);
  }

  sendSelectedChatDetails(chatDetails:any){
    this.selectedChat.next(chatDetails)
  }

  joinRoom(data: any) {
     this.socket.emit('join', data);
  }

  newUserJoin(){
    // let observable =  new Observable<any>(observer=>{
    //   this.socket.on('new user joined',(data)=>{
    //     observer.next(data)
    //   });
    //   return()=>{this.socket.disconnect();}
    // });
    // return observable;
    let observable = new Observable<any>(observer=>{
      this.socket.on('new user joined', (data)=>{
          observer.next(data);
      });
      return () => {this.socket.disconnect();}
  });

  return observable;
  }

  userLeave(){
    let observable =  new Observable<any>(observer=>{
      this.socket.on('leave',(data)=>{
        observer.next(data);
      });
      return () => { }
    });
    return observable;
  }

  sendMessage(data:any)
  {
      this.socket.emit('message',data);
  }

  sendRTCMessage(data:any){
    this.socket.emit('rtcMessage', data);
  } 

  message() {
    let observable =  new Observable<any>(observer=> {
          this.socket.on('new message',(data)=>{
            observer.next(data);
          });
          return()=>{}
    });
    return observable;
  }

  receiveRTCMessage() {
    let observable = new Observable<any>(observer=>{
      this.socket.on('receiveRTCMessage',(data)=>{
        observer.next(data);
      });
      return()=>{};
    });
    return observable;
  }

  createChat(userId:any): Observable<any> {
     return  this.http.post(API.createChat,userId);
  }

  getChatHistory(chatId:any): Observable<any> {
    return  this.http.get(API.fetchUserChat + '/'+ chatId);
  }

  saveMessage(messageData: any): Observable<any>{
    return this.http.post(API.saveMessage,messageData)
  }

  getChatList():Observable<any>{
    return this.http.get(API.fetchChatList);
  }

  //Socket calls
  setupSocket(userData:any){
    this.socket.emit('setup',userData)
  }

  socketConnected() {
    let observable =  new Observable<any>(observer=>{
      this.socket.on('connected',()=>{
         observer.next(true);
      });
      return()=> {}
    });
    return observable;
  }

  messageRecived(){
    let observable = new Observable<any>(observer=>{
      this.socket.on('receivedMessage', (data)=>{
          observer.next(data);
      });
      return () => {}
  });
  return observable;
}

emitMessageType(type:any,userId:any){
  this.socket.emit(type, userId);
}

messageTyping(){
  let observable = new Observable<any>(observer=>{
    this.socket.on('typing',()=>{
   observer.next(true)
    });
  });
  return observable;
}

messageStopTyping(){
  let observable = new Observable<any>(observer=>{
    this.socket.on('stopTyping',()=>{
   observer.next(false)
    });
  });
  return observable;
}
  newMessage(messageDetails:any){
      this.socket.emit('new message',messageDetails)
  }
}
