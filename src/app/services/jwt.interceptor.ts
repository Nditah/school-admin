import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { getLocalStorage } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor  implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  // Intercepts all HTTP requests!
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = getLocalStorage('token');
    if (!!token) {
      request = request.clone({
        setHeaders: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`,
          'cache-control': 'no-cache',
        }
      });
      console.log('\n================request ===================\n');
      console.log(request);
      console.log('\n================request ===================\n');
    }
    return next.handle(request);
  }

  showNotification(message, align= 'left') {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> ERROR <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
        positionClass: `toast-button-${align}`,
      });
    }

}
