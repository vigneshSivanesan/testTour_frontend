import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingComponent } from './profile-setting.component';

const routes: Routes = [
  {
    path:'',
    component: ProfileSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileSettingRoutingModule { }
