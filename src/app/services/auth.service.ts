import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../utils/constant'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDetails:any;
  constructor(public http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(API.login,credentials);
  }
}
