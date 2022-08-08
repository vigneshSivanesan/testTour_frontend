import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) {

   }

   getUser(userId: any): Observable<any> {
    return this.http.get(API.user + '/' + userId );
   }

   userUpdate(userDetails: any): Observable<any> {
    return this.http.put(API.userUpdate, userDetails);
   }

   updatePassword(details: any): Observable<any> {
    return this.http.post(API.updatePassword, details);
   }
}
