import { Component, createPlatform, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }
public loginForm: FormGroup;
  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
   this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]),
    password: new FormControl('', [Validators.required])
   });
  }

  login() {
     if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({next:res => {
        if(res.status === 'Success') {
       localStorage.setItem('token', res.token);
      localStorage.setItem('userDetails', JSON.stringify(res.data));
      this.authService.userDetails = res.data;
      this.router.navigate(['overView']);
        }
     }, error: err => {
      console.log(err);
     }
     });
     } 
  }
}
