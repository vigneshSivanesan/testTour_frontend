import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TourModule } from './routes/tour/tour.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokeninterceptorInterceptor } from './tokeninterceptor.interceptor';
import { TourDetailsModule } from './routes/tour-details/tour-details.module';
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './routes/auth/login/login.component';
import { LoginModule } from './routes/auth/login/login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthguardGuard } from '../app/utils/authguard.guard';
import { AccountSettingModule } from './routes/account-setting/account-setting.module';
import { ProfileSettingComponent } from './routes/profile-setting/profile-setting.component';
import { ProfileSettingModule } from './routes/profile-setting/profile-setting.module';
// import { NgxStripeModule } from 'ngx-stripe';
import { BookingComponent } from './routes/booking/booking.component';
import { ChatComponent } from './routes/chat/chat.component';
import { ModalsComponent } from './modals/modals.component';
import { ModalsModule } from './modals/modals.module';
import { MAT_DIALOG_DATA,MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChatComponent,
    ModalsComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TourModule,
    TourDetailsModule,
    AccountSettingModule,
    ProfileSettingModule,
    LoginModule,
    AppRoutingModule,
    HttpClientModule,
    ModalsModule,
    MatDialogModule
    // NgxStripeModule.forRoot('pk_test_51LSO62SAqQhGLLsYBXh1N1ctCHX2AI2qKzUHtdBU77optxXz9ngyTnQ35yqn2nTv8jQ1CJALQiBfe5NWbjjwdWj3003Di80MmE'),
  ],
  providers: [ NgbActiveModal, NgbModal, AuthguardGuard,{ provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokeninterceptorInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
