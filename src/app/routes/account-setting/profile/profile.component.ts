import { Component, createPlatform, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 public profileForm:  FormGroup;
 constructor(public userService: UserService) { }
 user: any;
 userDetails:any;
 ngOnInit(): void {
   this.user =  JSON.parse(localStorage.getItem('userDetails')|| '{}');
   this.loadData();
 }

 loadData() {
  this.createForm();
   this.getUserDetails(); 
 }

 getUserDetails() {
  if(this.user && this.user._id){
    this.userService.getUser(this.user._id).subscribe(res=> {
      if(res.status === 'Success') {
        this.userDetails =  res.data;
        this.loadFormValue();
      }
    });
  }
 }

 loadFormValue() {
  this.profileForm.patchValue({
    _id: this.userDetails._id,
    name: this.userDetails.name ? this.userDetails.name :'',
    email: this.userDetails.email ?  this.userDetails.email: '',
    profile:  this.userDetails.profile ?  this.userDetails.profile:''
  });
 }

  createForm() {
   this.profileForm =  new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.pattern('[^ @]*@[^ @]*')]),
    profile: new FormControl('')
   });
  }

  saveProfile() {
    if(this.profileForm.valid) {
      this.userService.userUpdate(this.profileForm.value).subscribe({next:res => {
        if(res.status === 'Success') {
          this.getUserDetails();
        }
     }, error: err => {
      console.log(err);
     }
     });
    }
  }

}
