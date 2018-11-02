import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Track} from './track/track';
import {MatSnackBar} from '@angular/material';



@Injectable()
export class TrackService {

  constructor( private http: HttpClient, private authService: AuthService, private snackBar: MatSnackBar) {
  }

  getTracks(): Observable<Track[]>  {
    return this.http.get<Track[]>('https://nodejs-restapi-adz.herokuapp.com/tracks');
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

  addTrack(number: string, title: string, viaPoints: string, trackColor: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.authService.getToken()
      })
    };

    const body: Track = {
      'number': number,
      'title': title,
      'viaPoints': viaPoints,
      'trackColor': trackColor
    };

    return this.http.post('https://nodejs-restapi-adz.herokuapp.com/api/track_create', body, httpOptions);
  }
}
