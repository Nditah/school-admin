import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { EnvService } from './env.service';
import { LoginResponse } from '../models';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../helpers';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
  *   status: 'success',
  *   user: {
  *     // User fields your app needs, like "id", "name", "email", etc.
  *   }
  * }Ø
  * ```
  * If the `status` field is not `success`, then an error is detected and returned.
  */

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token = null;
  depth = 0;

  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private env: EnvService) { }

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

  async postLogin(data, element): Promise<LoginResponse> {
    const payload = this.cleanObject(data);
    console.log('auth.service: payload =>', payload, this.env.API_URL + '/staff/login');
    const response = this.http.post(this.env.API_URL + '/staff/login', payload)
    .pipe(tap((res: LoginResponse) => {
      element.removeClass('running');
        console.log('auth.service: res =>', res);
      if (res.success) {
        this.showNotification(`Login successful<br/>Welcome! PMT Terminal Admin`, 'primary', 'left');
        const { user, token } = res.payload;
        if (setLocalStorage('user', user, null)) {
          console.log('User info stored');
        } else {
          console.error('Error storing item customer');
        }
        if (setLocalStorage('token', token, null)) {
            console.log('Token string stored');
          } else {
          console.error('Error storing item token');
          }
        this.token = token;
        this.isLoggedIn = true;
        const intendURL = getLocalStorage('intendURL') === null ? '/dashboard' : getLocalStorage('intendURL');
        this.router.navigate([intendURL]);
      } else {
        this.showNotification(res.message, 'danger', 'left');
        this.token = null;
        this.isLoggedIn = false;
      }
      }));
      return await response.toPromise();
  }


  showNotification(message, color = 'primary', align= 'left') {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: `alert alert-${color} alert-with-icon`,
        positionClass: `toast-button-${align}`,
      });
    }

  register(data: any) {
    const payload = this.cleanObject(data);
    return this.http.post(this.env.API_URL + '/staff', payload);
  }

  logout() {
    this.isLoggedIn = false;
    delete this.token;
    return removeLocalStorage('token');
  }

  getUser() {
    return getLocalStorage('user');
  }

  public async getToken(): Promise<any> {
    try {
      const token = await getLocalStorage('token');
      if (token != null) {
        this.token = token;
        this.isLoggedIn = true;
      } else {
        this.token = null;
        this.isLoggedIn = false;
      }
      return token;
    } catch (e) {
      console.log(e);
      alert(JSON.stringify(e));
      return null;
    }
  }

  userLogOut() {
    removeLocalStorage('user');
    removeLocalStorage('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    if (getLocalStorage('user')) {
      return true;
    } else {
      // Once the server is back return will
      // be change to false
      return false;
    }
  }

}
