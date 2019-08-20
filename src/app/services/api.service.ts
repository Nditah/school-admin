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
    //throwError(error);
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
  // -------BANK-REGISTER-----------//
  // /////////////////////////////////

  getBankRegister(path): Observable<any> {
    const url = `${this.env.API_URL}/bank-registers${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postBankRegister(data): Observable<any> {
    const url = `${this.env.API_URL}/bank-registers`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateBankRegister(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/bank-registers/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteBankRegister(id: string, data = null): Observable<any> {
    const url = `${this.env.API_URL}/bank-registers/${id}`;
    return this.http.patch(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // deleteBankRegister(id: string): Observable<{}> {
  //   const url = `${this.env.API_URL}/bank-registers/${id}`;
  //   return this.http.delete(url, httpOptions).pipe(
  //       catchError(this.handleError)
  //     );
  // }

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
  // ----------CUSTOMER-------------//
  // /////////////////////////////////

  getCustomer(path): Observable<any> {
    const url = `${this.env.API_URL}/customers${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postCustomer(data): Observable<any> {
    const url = `${this.env.API_URL}/customers`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateCustomer(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/customers/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
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

  // /////////////////////////////////
  // ----------MESSAGE-------------//
  // /////////////////////////////////

  getMessage(path): Observable<any> {
    const url = `${this.env.API_URL}/messages${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postMessage(data): Observable<any> {
    const url = `${this.env.API_URL}/messages`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  postSMS(data): Observable<any> {
    const url = `${this.env.API_URL}/sms`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateMessage(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/messages/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  // /////////////////////////////////
  // ----------NOTIFICATION---------//
  // /////////////////////////////////

  getNotification(path): Observable<any> {
    const url = `${this.env.API_URL}/notifications${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updateNotification(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/notifications/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  // /////////////////////////////////
  // ----------DRIVER-------------//
  // /////////////////////////////////

  getDriver(path): Observable<any> {
    const url = `${this.env.API_URL}/partners${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
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
  // ----------TERMINAL-----------------//
  // /////////////////////////////////

  getTerminal(path): Observable<any> {
    const url = `${this.env.API_URL}/terminals${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }


  // /////////////////////////////////
  // ----------BOARDING-------------//
  // /////////////////////////////////

  getPmtBoarding(path): Observable<any> {
    const url = `${this.env.API_URL}/pmt-boardings${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postPmtBoarding(data): Observable<any> {
    const url = `${this.env.API_URL}/pmt-boardings`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updatePmtBoarding(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/pmt-boardings/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deletePmtBoarding(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/pmt-boardings/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }


  // /////////////////////////////////
  // ----------BOOKING-------------//
  // /////////////////////////////////

  getPmtBooking(path): Observable<any> {
    const url = `${this.env.API_URL}/pmt-booking-services${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postPmtBooking(data): Observable<any> {
    const url = `${this.env.API_URL}/pmt-booking-services`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updatePmtBooking(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/pmt-booking-services/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deletePmtBooking(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/pmt-booking-services/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  // /////////////////////////////////
  // ----------RESERVATION-------------//
  // /////////////////////////////////

  getPmtReservation(path): Observable<any> {
    const url = `${this.env.API_URL}/pmt-reservations${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postPmtReservation(data): Observable<any> {
    const url = `${this.env.API_URL}/pmt-reservations`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updatePmtReservation(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/pmt-reservations/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deletePmtReservation(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/pmt-reservations/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }


  verifyReservation(txRef: string): Observable<ApiResponse> {
    const code = txRef.replace(/[^\w\s]/gi, ''); // remove all special characters
    const url = `?transaction_code=/${code}/i`;
    return this.http.get<ApiResponse>(this.env.API_URL + '/pmt-reservations' + url);
  }


  // /////////////////////////////////
  // ----------ROUTES------------//
  // /////////////////////////////////

  getPmtRoute(path): Observable<any> {
    const url = `${this.env.API_URL}/pmt-routes${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // /////////////////////////////////
  // ----------SCHEDDULE------------//
  // /////////////////////////////////

  getPmtSchedule(path): Observable<any> {
    const url = `${this.env.API_URL}/pmt-schedules${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postPmtSchedule(data): Observable<any> {
    const url = `${this.env.API_URL}/pmt-schedules`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updatePmtSchedule(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/pmt-schedules/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deletePmtSchedule(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/pmt-schedules/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  busLoadedStatus(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/pmt-schedules/operation/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }
  // /////////////////////////////////
  // ----------WAYBILL-------------//
  // /////////////////////////////////

  getPmtWaybill(path): Observable<any> {
    const url = `${this.env.API_URL}/pmt-waybills${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postPmtWaybill(data): Observable<any> {
    const url = `${this.env.API_URL}/pmt-waybills`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updatePmtWaybill(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/pmt-waybills/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deletePmtWaybill(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/pmt-waybills/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
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
  // deletePmlShipment(id: string): Observable<{}> {
  //   const url = `${this.env.API_URL}/pml-shipments/${id}`;
  //   return this.http.delete(url, httpOptions).pipe(
  //       catchError(this.handleError)
  //     );
  // }


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
  // ----------BOOKING-------------//
  // /////////////////////////////////

  getVehicle(path): Observable<any> {
    const url = `${this.env.API_URL}/vehicles${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
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

  // /////////////////////////////////
  // ----------PmlBilling-------------//
  // /////////////////////////////////

  getPmlBilling(path): Observable<any> {
    const url = `${this.env.API_URL}/pml-billings${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postPmlBilling(data): Observable<any> {
    const url = `${this.env.API_URL}/pml-billings`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updatePmlBilling(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/pml-billings/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deletePmlBilling(id: string, data = null): Observable<any> {
    const url = `${this.env.API_URL}/pml-billings/${id}`;
    return this.http.patch(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // deletePmlBilling(id: string): Observable<{}> {
  //   const url = `${this.env.API_URL}/pml-billings/${id}`;
  //   return this.http.delete(url, httpOptions).pipe(
  //       catchError(this.handleError)
  //     );
  // }


  // /////////////////////////////////
  // ----------PmlRouting-------------//
  // /////////////////////////////////

  getPmlRouting(path): Observable<any> {
    const url = `${this.env.API_URL}/pml-routings${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postPmlRouting(data): Observable<any> {
    const url = `${this.env.API_URL}/pml-routings`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updatePmlRouting(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/pml-routings/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deletePmlRouting(id: string, data = null): Observable<any> {
    const url = `${this.env.API_URL}/pml-routings/${id}`;
    return this.http.patch(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // deletePmlRouting(id: string): Observable<{}> {
  //   const url = `${this.env.API_URL}/pml-routings/${id}`;
  //   return this.http.delete(url, httpOptions).pipe(
  //       catchError(this.handleError)
  //     );
  // }


  // /////////////////////////////////
  // ----------PmlShipment-------------//
  // /////////////////////////////////

  getPmlWaybill(path): Observable<any> {
    const url = `${this.env.API_URL}/pml-waybills${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postPmlWaybill(data): Observable<any> {
    const url = `${this.env.API_URL}/pml-waybills`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updatePmlWaybill(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/pml-waybills/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deletePmlWaybill(id: string, data = null): Observable<any> {
    const url =  `${this.env.API_URL}/pml-waybills/${id}`;
    return this.http.patch(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // deletePmlWaybill(id: string): Observable<{}> {
  //   const url = `${this.env.API_URL}/pml-waybills/${id}`;
  //   return this.http.delete(url, httpOptions).pipe(
  //       catchError(this.handleError)
  //     );
  // }
}
