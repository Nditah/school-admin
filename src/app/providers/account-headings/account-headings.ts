import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountHeading, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class AccountHeadings {

  accountheadings: AccountHeading[] = [];

  constructor(private apiService: ApiService) {
    const accountheadings = []; // Initial Values
    for (const accountheading of accountheadings) {
      this.accountheadings.push(new AccountHeading(accountheading));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.accountheadings;
    }
    return this.accountheadings.filter((accountheading) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = accountheading[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return accountheading;
            } else if (field === params[key]) {
              return accountheading;
            }
          }
      }
      return null;
    });
  }

  add(accountheading: AccountHeading) {
    this.accountheadings.push(accountheading);
  }

  delete(accountheading: AccountHeading) {
    this.accountheadings.splice(this.accountheadings.indexOf(accountheading), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getAccountHeading(queryString).pipe(
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
    const proRes = this.apiService.postAccountHeading(data).pipe(
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

  async recordUpdate(accountheading: AccountHeading, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateAccountHeading(accountheading.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(accountheading);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
