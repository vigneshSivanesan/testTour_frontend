import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {


    constructor(public router:  Router) { }
    canActivate(state: RouterStateSnapshot): Observable<boolean> | boolean {
      const userDetails =  localStorage.getItem('userDetails');
      if(!userDetails){
       if(state.url === '/login'){
       this.router.navigate(['login']);
       } else {
        return true;
       }
      } else {
        return true;
      }
    }
}