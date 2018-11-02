import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import 'rxjs-compat/add/operator/map';
import {MatSnackBar} from '@angular/material';

class LoginResponse {

  success: string;
  message: string;
  token: string;

}

@Injectable()
export class AuthService {
  loginResponse: LoginResponse;

  constructor( private http: HttpClient, private cookieService: CookieService, private snackBar: MatSnackBar) {
    this.readCookie();
  }

  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  signIn(email: string, password: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    const body = {
      'email': email,
      'password': password,
    };

    return this.http.post('http://nodejs-restapi-adz.herokuapp.com/authenticate', body, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
      .map( (next: LoginResponse) => {
        this.loginResponse = next;
        this.writeCookie();
        return this.isSignedIn();
      });
  }

  signUp(firstName: string, lastName: string, email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const body = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'password': password,
    };

    return this.http.post('http://nodejs-restapi-adz.herokuapp.com/user_create', body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getToken(): string {
    if ( this.isSignedIn() ) {
      return this.loginResponse.token;
    }
    return null;
  }

  writeCookie() {
    if ( this.loginResponse != null ) {
      this.cookieService.set('success', this.loginResponse.success);
      this.cookieService.set('token', this.loginResponse.token);
      this.cookieService.set('message', this.loginResponse.message);
    }

  }

  readCookie() {
    if ( this.cookieService.check('success') ) {
      this.loginResponse = {
        'success': this.cookieService.get('success'),
        'token': this.cookieService.get('token'),
        'message': this.cookieService.get('message')
      };
    }
  }

  isSignedIn() {
    if ( this.loginResponse != null && this.loginResponse.success.toString() === 'true') {
      return true;
    }
    return false;
  }
}
