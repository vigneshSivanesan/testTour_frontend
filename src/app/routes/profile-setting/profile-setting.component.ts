import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit {

  constructor(public userService: UserService) { }
  user: any;
  ngOnInit(): void {
    this.user =  localStorage.getItem('userDetails')
    this.loadData();
  }

  loadData() {
    this.getUserDetails() 
  }

  getUserDetails() {

  }
}
