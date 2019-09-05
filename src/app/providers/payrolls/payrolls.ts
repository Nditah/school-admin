import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Payroll, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Payrolls {

  payrolls: Payroll[] = [];

  constructor(private apiService: ApiService) {
    const payrolls = []; // Initial Values
    for (const payroll of payrolls) {
      this.payrolls.push(new Payroll(payroll));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.payrolls;
    }
    return this.payrolls.filter((payroll) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = payroll[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return payroll;
            } else if (field === params[key]) {
              return payroll;
            }
          }
      }
      return null;
    });
  }

  add(payroll: Payroll) {
    this.payrolls.push(payroll);
  }

  delete(payroll: Payroll) {
    this.payrolls.splice(this.payrolls.indexOf(payroll), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getPayroll(queryString).pipe(
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
    const proRes = this.apiService.postPayroll(data).pipe(
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

  async recordUpdate(payroll: Payroll, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updatePayroll(payroll.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(payroll);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }

}
