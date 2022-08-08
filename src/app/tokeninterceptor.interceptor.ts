import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { LoginRoutingModule } from './routes/auth/login/login-routing.module';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Injectable()
export class TokeninterceptorInterceptor implements HttpInterceptor {

  constructor( public router:Router, public authService:AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     let request : HttpRequest<any>;                                                                                                           
     const token = localStorage.getItem('token');
     if(token){
      request = req.clone({
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': environment.BASE_URL + environment.API_ENDPOINT,
          'Authorization': 'Bearer ' + token
        })
      });
     } else {
      request = req.clone({
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': environment.BASE_URL + environment.API_ENDPOINT
        })
      });
     }
     return next.handle(request).pipe(
      catchError((requestError: HttpErrorResponse) => {
        if (requestError && requestError.status === 401) {
          this.logOut();
          return throwError(() => new Error(requestError.message));
        } else {
          return throwError(() => new Error(requestError.message));
        }
      }
      ));
   
  
  }

  logOut(){
    localStorage.clear();
    this.authService.userDetails = undefined; 
    this.router.navigate(['login']);    
  }
}
