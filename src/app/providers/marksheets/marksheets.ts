import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Marksheet, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Marksheets {

  marksheets: Marksheet[] = [];

  constructor(private apiService: ApiService) {
    const marksheets = []; // Initial Values
    for (const marksheet of marksheets) {
      this.marksheets.push(new Marksheet(marksheet));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.marksheets;
    }
    return this.marksheets.filter((marksheet) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = marksheet[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return marksheet;
            } else if (field === params[key]) {
              return marksheet;
            }
          }
      }
      return null;
    });
  }

  add(marksheet: Marksheet) {
    this.marksheets.push(marksheet);
  }

  delete(marksheet: Marksheet) {
    this.marksheets.splice(this.marksheets.indexOf(marksheet), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getMarksheet(queryString).pipe(
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
    const proRes = this.apiService.postMarksheet(data).pipe(
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

  async recordUpdate(marksheet: Marksheet, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateMarksheet(marksheet.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(marksheet);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }

}
