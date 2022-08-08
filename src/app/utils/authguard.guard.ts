import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userDetails =  localStorage.getItem('userDetails');
    if(!userDetails){
      if(state.url === '/login')
      this.router.navigate(['login']);
    } else {
      if(state.url === ''){
        this.router.navigate(['overView']);
      }
    }
      return true;
    
  }
  
}
