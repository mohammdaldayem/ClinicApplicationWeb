import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  logUser: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.logUser = localStorage.getItem('loggedIn');
    if (this.logUser === 'true') {
    this.router.navigate(['/home']);
  }
  }
  login() {
    if ( this.model.email === 'admin@admin.com' && this.model.Password === 'password' ) {
      this.router.navigate(['/home']);
      localStorage.setItem('loggedIn', 'true' );
    }
   }

}
