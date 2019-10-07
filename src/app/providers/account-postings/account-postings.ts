import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountPosting, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class AccountPostings {

  accountPostings: AccountPosting[] = [];

  constructor(private apiService: ApiService) {
    const accountPostings = []; // Initial Values
    for (const accountPosting of accountPostings) {
      this.accountPostings.push(new AccountPosting(accountPosting));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.accountPostings;
    }
    return this.accountPostings.filter((accountPosting) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = accountPosting[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return accountPosting;
            } else if (field === params[key]) {
              return accountPosting;
            }
          }
      }
      return null;
    });
  }

  add(accountPosting: AccountPosting) {
    this.accountPostings.push(accountPosting);
  }

  delete(accountPosting: AccountPosting) {
    this.accountPostings.splice(this.accountPostings.indexOf(accountPosting), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getAccountPosting(queryString).pipe(
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
    const proRes = this.apiService.postAccountPosting(data).pipe(
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

  async recordUpdate(accountPosting: AccountPosting, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateAccountPosting(accountPosting.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(accountPosting);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
