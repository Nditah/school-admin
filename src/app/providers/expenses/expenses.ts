import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Expenses {

  expenses: Expense[] = [];

  constructor(private apiService: ApiService) {
    const expenses = []; // Initial Values
    for (const expense of expenses) {
      this.expenses.push(new Expense(expense));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.expenses;
    }
    return this.expenses.filter((expense) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = expense[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return expense;
            } else if (field === params[key]) {
              return expense;
            }
          }
      }
      return null;
    });
  }

  add(expense: Expense) {
    this.expenses.push(expense);
  }

  delete(expense: Expense) {
    this.expenses.splice(this.expenses.indexOf(expense), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getExpense(queryString).pipe(
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
    const proRes = this.apiService.postExpense(data).pipe(
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

  async recordUpdate(expense: Expense, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateExpense(expense.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          console.log('recordUpdate() successful');
          this.delete(expense);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
