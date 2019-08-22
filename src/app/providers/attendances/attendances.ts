import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Attendance, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Attendances {

    attendances: Attendance[] = [];

  constructor(private apiService: ApiService) {
    const attendances = []; // Initial Values
    for (const attendance of attendances) {
      this.attendances.push(new Attendance(attendance));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.attendances;
    }
    return this.attendances.filter((feestype) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = feestype[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return feestype;
            } else if (field === params[key]) {
              return feestype;
            }
          }
      }
      return null;
    });
  }

  add(attendance: Attendance) {
    this.attendances.push(attendance);
  }

  delete(attendance: Attendance) {
    this.attendances.splice(this.attendances.indexOf(attendance), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getAttendance(queryString).pipe(
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
    const proRes = this.apiService.postAttendance(data).pipe(
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

  async recordUpdate(attendance: Attendance, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateAttendance(attendance.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(attendance);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }

}
