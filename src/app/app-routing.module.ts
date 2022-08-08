import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthguardGuard } from '../app/utils/authguard.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('../app/routes/tour/tour.module').then(m => m.TourModule), pathMatch: 'full',   canActivate: [AuthguardGuard]},
  {
    path: 'login',
    loadChildren: () => import('../app/routes/auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'overView',
    loadChildren: () => import('../app/routes/tour/tour.module').then(m => m.TourModule),
    canActivate: [AuthguardGuard]
  },
  {
    path:'tourDetails',
    loadChildren:()=> import('../app/routes/tour-details/tour-details.module').then(m => m.TourDetailsModule),
    canActivate: [AuthguardGuard]
  },
  {
    path:'accountSetting',
    loadChildren:()=> import('../app/routes/account-setting/account-setting.module').then(m=> m.AccountSettingModule),
    canActivate:[AuthguardGuard]
  },
  {
    path:'profileSetting',
    loadChildren:()=> import('../app/routes/profile-setting/profile-setting.module').then(m=> m.ProfileSettingModule),
    canActivate:[AuthguardGuard]
  },
  {
    path:'booking',
    loadChildren:()=> import('../app/routes/booking/booking.module').then(m=> m.BookingModule),
    canActivate:[AuthguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
