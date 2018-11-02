import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

class SignupMessage {
  message: string;
}

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.sass']
})
export class SignupPageComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  password: string;


  constructor( private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  signUp() {
    this.authService.signUp(this.firstName, this.lastName, this.email, this.password)
      .subscribe( (next: SignupMessage) => {
        if ( next.message.toString() === 'OK' ) {
          this.router.navigate(['/login']);
        } else {
          this.snackBar.open('Something bad happened; please try again later.', null, {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });
  }

}
