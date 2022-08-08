import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 userDetails: any;
  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userDetails =  localStorage.getItem('userDetails');
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['login']);   
    this.authService.userDetails = undefined; 
  }
}
