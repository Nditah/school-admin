import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Staff, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Staffs {

  staffs: Staff[] = [];

  constructor(private apiService: ApiService) {
    const staffs = []; // Initial Values
    for (const staff of staffs) {
      this.staffs.push(new Staff(staff));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.staffs;
    }
    return this.staffs.filter((staff) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = staff[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return staff;
            } else if (field === params[key]) {
              return staff;
            }
          }
      }
      return null;
    });
  }

  add(staff: Staff) {
    this.staffs.push(staff);
  }

  delete(staff: Staff) {
    this.staffs.splice(this.staffs.indexOf(staff), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getStaff(queryString).pipe(
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
    const proRes = this.apiService.postStaff(data).pipe(
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

  async recordUpdate(staff: Staff, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateStaff(staff.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(staff);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }

}
