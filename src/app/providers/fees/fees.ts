import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fee, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Fees {

  fees: Fee[] = [];

  constructor(private apiService: ApiService) {
    const fees = []; // Initial Values
    for (const fee of fees) {
      this.fees.push(new Fee(fee));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.fees;
    }
    return this.fees.filter((fee) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = fee[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return fee;
            } else if (field === params[key]) {
              return fee;
            }
          }
      }
      return null;
    });
  }

  add(fee: Fee) {
    this.fees.push(fee);
  }

  delete(fee: Fee) {
    this.fees.splice(this.fees.indexOf(fee), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getFee(queryString).pipe(
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
    const proRes = this.apiService.postFee(data).pipe(
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

  async recordUpdate(fee: Fee, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateFee(fee.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(fee);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }

}
