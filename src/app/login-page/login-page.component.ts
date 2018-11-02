import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {

  email: string;
  password: string;

  constructor( private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.signIn(this.email, this.password)
      .subscribe( (res: boolean) => {
        if ( res ) {
          this.router.navigate(['/']);
        } else {
          this.snackBar.open('email or password is incorrect', null, {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });

  }

}
