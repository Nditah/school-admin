import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sms, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Smss {

  smss: Sms[] = [];

  constructor(private apiService: ApiService) {
    const smss = []; // Initial Values
    for (const sms of smss) {
      this.smss.push(new Sms(sms));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.smss;
    }
    return this.smss.filter((sms) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = sms[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return sms;
            } else if (field === params[key]) {
              return sms;
            }
          }
      }
      return null;
    });
  }

  add(sms: Sms) {
    this.smss.push(sms);
  }

  delete(sms: Sms) {
    const index = this.smss.findIndex(sms => sms.id === sms.id);
    this.smss.splice(index, 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getSms(queryString).pipe(
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
    const proRes = this.apiService.postSms(data).pipe(
    map((res: ApiResponse) => {
        if (res.success && res.payload) {
          const sms = res.payload;
          this.add(sms);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordUpdate(sms: Sms, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateSms(sms.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(sms);
          const newSms = res.payload;
          this.add(newSms);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

}
