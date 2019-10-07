import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeesType, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class FeesTypes {

  feestypes: FeesType[] = [];

  constructor(private apiService: ApiService) {
    const feestypes = []; // Initial Values
    for (const feestype of feestypes) {
      this.feestypes.push(new FeesType(feestype));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.feestypes;
    }
    return this.feestypes.filter((feestype) => {
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

  add(feestype: FeesType) {
    this.feestypes.push(feestype);
  }

  delete(feestype: FeesType) {
    this.feestypes.splice(this.feestypes.indexOf(feestype), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getFeesType(queryString).pipe(
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
    const proRes = this.apiService.postFeesType(data).pipe(
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

  async recordUpdate(feestype: FeesType, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateFeesType(feestype.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(feestype);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }

}
