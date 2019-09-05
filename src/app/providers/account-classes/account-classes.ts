import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountClass, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class AccountClasses {

  accountClasses: AccountClass[] = [];

  constructor(private apiService: ApiService) {
    const accountClasses = []; // Initial Values
    for (const accountClass of accountClasses) {
      this.accountClasses.push(new AccountClass(accountClass));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.accountClasses;
    }
    return this.accountClasses.filter((accountClass) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = accountClass[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return accountClass;
            } else if (field === params[key]) {
              return accountClass;
            }
          }
      }
      return null;
    });
  }

  add(accountClass: AccountClass) {
    this.accountClasses.push(accountClass);
  }

  delete(accountClass: AccountClass) {
    this.accountClasses.splice(this.accountClasses.indexOf(accountClass), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getAccountClass(queryString).pipe(
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
    const proRes = this.apiService.postAccountClass(data).pipe(
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

  async recordUpdate(accountClass: AccountClass, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateAccountClass(accountClass.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(accountClass);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
