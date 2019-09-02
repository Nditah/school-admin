import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timetable, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Timetables {

  timetables: Timetable[] = [];

  constructor(private apiService: ApiService) {
    const timetables = []; // Initial Values
    for (const timetable of timetables) {
      this.timetables.push(new Timetable(timetable));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.timetables;
    }
    return this.timetables.filter((timetable) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = timetable[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return timetable;
            } else if (field === params[key]) {
              return timetable;
            }
          }
      }
      return null;
    });
  }

  add(timetable: Timetable) {
    this.timetables.push(timetable);
  }

  delete(timetable: Timetable) {
    this.timetables.splice(this.timetables.indexOf(timetable), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getTimetable(queryString).pipe(
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
    const proRes = this.apiService.postTimetable(data).pipe(
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

  async recordUpdate(timetable: Timetable, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateTimetable(timetable.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(timetable);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
