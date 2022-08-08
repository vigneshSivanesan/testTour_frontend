import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourDetailsRoutingModule } from './tour-details-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { TourComponent } from '../tour/tour.component';
import { TourDetailsComponent } from './tour-details.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [TourDetailsComponent],
  imports: [
    CommonModule,
    TourDetailsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapKey,
      apiVersion: '3.31'
  }),
  ]
})
export class TourDetailsModule { }
