import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Office, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Offices {

  offices: Office[] = [];

  constructor(private apiService: ApiService) {
    const offices = []; // Initial Values
    for (const office of offices) {
      this.offices.push(new Office(office));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.offices;
    }
    return this.offices.filter((office) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = office[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return office;
            } else if (field === params[key]) {
              return office;
            }
          }
      }
      return null;
    });
  }

  add(office: Office) {
    this.offices.push(office);
  }

  delete(office: Office) {
    // const index = this.offices.findIndex(office => office.id === office.id);
    // this.offices.splice(index, 1);
    this.offices.splice(this.offices.indexOf(office), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getOffice(queryString).pipe(
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
    const proRes = this.apiService.postOffice(data).pipe(
    map((res: ApiResponse) => {
        if (res.success && res.payload) {
          const office = res.payload;
          this.add(office);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }

  async recordUpdate(office: Office, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateOffice(office.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(office);
          const newOffice = res.payload;
          this.add(newOffice);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }

}
