import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingComponent } from './account-setting.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {
    path:'',
    component: AccountSettingComponent
  },
  {
    path:'chat',
    component: ChatComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingRoutingModule { }
