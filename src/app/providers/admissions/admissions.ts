import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Admission, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Admissions {

  admissions: Admission[] = [];

  constructor(private apiService: ApiService) {
    const admissions = []; // Initial Values
    for (const admission of admissions) {
      this.admissions.push(new Admission(admission));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.admissions;
    }
    return this.admissions.filter((admission) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = admission[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return admission;
            } else if (field === params[key]) {
              return admission;
            }
          }
      }
      return null;
    });
  }

  add(admission: Admission) {
    this.admissions.push(admission);
  }

  delete(admission: Admission) {
    const index = this.admissions.findIndex(pmtAdmission => pmtAdmission.id === admission.id);
    this.admissions.splice(index, 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getAdmission(queryString).pipe(
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
    const proRes = this.apiService.postAdmission(data).pipe(
    map((res: ApiResponse) => {
        if (res.success && res.payload) {
          const admission = res.payload;
          this.add(admission);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordUpdate(admission: Admission, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateAdmission(admission.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(admission);
          const newAdmission = res.payload;
          this.add(newAdmission);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

}
