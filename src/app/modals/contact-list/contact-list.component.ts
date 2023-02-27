import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, public userService:UserService, public chatService: ChatService) { }
   search:any;
   userList:any;
  ngOnInit(): void {
  this.getUserList();
  }

  getUserList() {
    this.userService.getUserList(this.search).subscribe({next:res => {
      if(res.status === 'Success') {
        this.userList = res.data;
        console.log(this.userList)
      }
   }, error: err => {
    console.log(err);
   }
   });
  }

  close() {
    this.activeModal.close();
  }

  createChat(contact:any) {
   this.chatService.createChat({userId:contact._id}).subscribe({next:res=>{
    if(res.status === 'Success') {
      this.activeModal.close(res.data[0]);
    }
   }, error:err=>{
    console.log(err);
   }})
  }
}
