import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileSettingComponent } from '../profile-setting/profile-setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss']
})
export class AccountSettingComponent implements OnInit {
  @ViewChild(ProfileComponent, {static: false}) Profile: ProfileComponent;
  @ViewChild(ChangePasswordComponent, {static: false}) ChangePassword: ChangePasswordComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
