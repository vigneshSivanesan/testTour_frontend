import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public userService:  UserService) { }

  passwordForm: FormGroup;
  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.passwordForm =  new FormGroup({
      currentPassword : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required]),
      confirmPassword: new FormControl(''),
    });
  }

  save(){
    if(this.passwordForm.valid){
      this.passwordForm.patchValue({confirmPassword:this.passwordForm.value.password})
      this.userService.updatePassword(this.passwordForm.value).subscribe({next:res => {
        if(res.status === 'Success') {
          console.log('Success');
        }
     }, error: err => {
      console.log(err);
     }
     });
    }
  }

}
