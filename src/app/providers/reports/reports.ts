import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Report, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Reports {

  reports: Report[] = [];

  constructor(private apiService: ApiService) {
    const reports = []; // Initial Values
    for (const report of reports) {
      this.reports.push(new Report(report));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.reports;
    }
    return this.reports.filter((report) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = report[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return report;
            } else if (field === params[key]) {
              return report;
            }
          }
      }
      return null;
    });
  }

  add(report: Report) {
    this.reports.push(report);
  }

  delete(report: Report) {
    this.reports.splice(this.reports.indexOf(report), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getReport(queryString).pipe(
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
    const proRes = this.apiService.postReport(data).pipe(
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

  async recordUpdate(report: Report, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateReport(report.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(report);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
