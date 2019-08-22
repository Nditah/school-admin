import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Notifications {

  notifications: Notification[] = [];

  constructor(private apiService: ApiService) {
    const notifications = []; // Initial Values
    for (const notification of notifications) {
      this.notifications.push(new Notification(notification));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.notifications;
    }
    return this.notifications.filter((notification) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = notification[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return notification;
            } else if (field === params[key]) {
              return notification;
            }
          }
      }
      return null;
    });
  }

  add(notification: Notification) {
    this.notifications.push(notification);
  }

  delete(notification: Notification) {
    const index = this.notifications.findIndex(notification => notification.id === notification.id);
    this.notifications.splice(index, 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getNotification(queryString).pipe(
    map((res: ApiResponse) => {
      console.log(res);
        if (res.success && res.payload.length > 0) {
          res.payload.forEach(element => {
            this.add(element);
          });
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordCreate(data): Promise<ApiResponse> {
    const proRes = this.apiService.postNotification(data).pipe(
    map((res: ApiResponse) => {
        if (res.success && res.payload) {
          const notification = res.payload;
          this.add(notification);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordUpdate(notification: Notification, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateNotification(notification.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(notification);
          const newNotification = res.payload;
          this.add(newNotification);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

}
