import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../utils/constant'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  getTourList(): Observable<any> {
    return this.http.get(API.tourList)
  }

  getTour(tourId: string): Observable<any>{
    return this.http.get(API.getTour + '/' + tourId);
  }

  bookTour(bookingDetails:any): Observable<any>{
    return this.http.post(API.bookingTour,bookingDetails)
  }

  createBookings(bookings: any): Observable<any> {
    return this.http.post(API.createBooking, bookings)
  }
}
