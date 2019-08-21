import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeesPayment, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class FeesPayments {

  feespayments: FeesPayment[] = [];

  constructor(private apiService: ApiService) {
    const feespayments = []; // Initial Values
    for (const feespayment of feespayments) {
      this.feespayments.push(new FeesPayment(feespayment));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.feespayments;
    }
    return this.feespayments.filter((feespayment) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = feespayment[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return feespayment;
            } else if (field === params[key]) {
              return feespayment;
            }
          }
      }
      return null;
    });
  }

  add(feespayment: FeesPayment) {
    this.feespayments.push(feespayment);
  }

  delete(feespayment: FeesPayment) {
    this.feespayments.splice(this.feespayments.indexOf(feespayment), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getFeesPayment(queryString).pipe(
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
    const proRes = this.apiService.postStaff(data).pipe(
    map((res: ApiResponse) => {
        if (res.success && res.payload) {
          console.log('recordCreate() successful');
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }

  async recordUpdate(feespayment: FeesPayment, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateFeesPayment(feespayment.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(feespayment);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }

}
