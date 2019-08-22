import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(private toastr: ToastrService) {
  }

  /**
   *
   * @param message message to be sent back to user
   * @param status the status of the notification {'success', 'danger', 'warning', 'info'}
   */
  showNotification(message, status= 'primary') {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-' + status + ' alert-with-icon',
      });
    }
}
