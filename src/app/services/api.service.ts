import { Injectable } from '@angular/core';
import { Observable, of, from, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EnvService } from './env.service';
import { ApiResponse } from '../models';


const API_STORAGE_KEY = 'specialkey';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  depth = 0;

  constructor(private http: HttpClient,
              private env: EnvService,
              private router: Router) { }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError('Something bad happened; please try again later.');
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    // throwError(error);
    console.log('Something bad happened; please try again later.');
    return throwError(error);
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  cleanObject(obj) {
    this.depth += 1;
    // eslint-disable-next-line no-restricted-syntax
    for (const propName in obj) {
        if (!obj[ propName ] || obj[ propName ].length === 0) {
            delete obj[ propName ];
        } else if (typeof obj === 'object') {
            if (this.depth <= 3) {
              this.cleanObject(obj[ propName ]);
            }
        }
    }
    return obj;
  }

  getImageUrl(str: string) {
    return `${this.env.API_URL}/assets/images/${str}`;
  }

  // /////////////////////////////////
  // ---------- Attendance -------------//
  // /////////////////////////////////

  getAttendance(path): Observable<any> {
    const url = `${this.env.API_URL}/attendances${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postAttendance(data): Observable<any> {
    const url = `${this.env.API_URL}/attendances`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateAttendance(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/attendances/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

 // /////////////////////////////////
  // ----------Book-------------//
  // /////////////////////////////////

  getBook(path): Observable<any> {
    const url = `${this.env.API_URL}/books${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postBook(data): Observable<any> {
    const url = `${this.env.API_URL}/books`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateBook(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/books/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  // /////////////////////////////////
  // ----------LOCATIONS-------------//
  // /////////////////////////////////

  getCounty(path): Observable<any> {
    const url = `${this.env.API_URL}/counties${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getCity(path): Observable<any> {
    const url = `${this.env.API_URL}/cities${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getState(path): Observable<any> {
    const url = `${this.env.API_URL}/states${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // /////////////////////////////////
  // ----------STAFF-------------//
  // /////////////////////////////////

  getStaff(path): Observable<any> {
    const url = `${this.env.API_URL}/staff${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postStaff(data): Observable<any> {
    const url = `${this.env.API_URL}/staff`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateStaff(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/staff/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  // /////////////////////////////////
  // ----------TABLE-------------//
  // /////////////////////////////////

  getTable(path): Observable<any> {
    const url = `${this.env.API_URL}/tables${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // /////////////////////////////////
  // ----------ADMISSION-------------//
  // /////////////////////////////////

  getAdmission(path): Observable<any> {
    const url = `${this.env.API_URL}/admissions${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postAdmission(data): Observable<any> {
    const url = `${this.env.API_URL}/admissions`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateAdmission(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/admissions/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteAdmission(id: string, data = null): Observable<any> {
    const url = `${this.env.API_URL}/admissions/${id}`;
    return this.http.patch(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  // /////////////////////////////////
  // ----------SETTING-------------//
  // /////////////////////////////////


  getSetting2(url = '?fields=name,value&names=FAQ_PMT,TERMS_PMT,POLICY_PMT,ABOUT_PMT') {
    return this.http.get<ApiResponse>(this.env.API_URL + '/settings/public' + url);
  }

  getSetting(path): Observable<any> {
    const url = `${this.env.API_URL}/settings${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // /////////////////////////////////
  // ----------IMAGE-------------//
  // /////////////////////////////////

  postImage(data): Observable<any> {
    const url = `${this.env.API_URL}/images`;
    return this.http.post(url, data, httpOptions).pipe(
        catchError(this.handleError)
      );
  }
 // /////////////////////////////////
  // ----------FEES PAYMENT-------------//
  // /////////////////////////////////

  getFeesPayment(path): Observable<any> {
    const url = `${this.env.API_URL}/fees_payments${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postFeesPayment(data): Observable<any> {
    const url = `${this.env.API_URL}/fees_payments`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateFeesPayment(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/fees_payments/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }
// /////////////////////////////////
  // ----------FEES TYPE-------------//
  // /////////////////////////////////

  getFeesType(path): Observable<any> {
    const url = `${this.env.API_URL}/fees_types${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postFeesType(data): Observable<any> {
    const url = `${this.env.API_URL}/fees_types`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateFeesType(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/fees_types/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  // /////////////////////////////////
  // ----------RATING-------------//
  // /////////////////////////////////

  getRating(path): Observable<any> {
    const url = `${this.env.API_URL}/ratings${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postRating(data): Observable<any> {
    const url = `${this.env.API_URL}/ratings`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateRating(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/ratings/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteRating(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/ratings/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }
}
