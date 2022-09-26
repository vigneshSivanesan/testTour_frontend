import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingRoutingModule } from './account-setting-routing.module';
import { AccountSettingComponent } from './account-setting.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    AccountSettingComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    AccountSettingRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccountSettingModule { }
