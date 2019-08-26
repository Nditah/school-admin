import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hostel, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Hostels {

  hostels: Hostel[] = [];

  constructor(private apiService: ApiService) {
    const hostels = []; // Initial Values
    for (const hostel of hostels) {
      this.hostels.push(new Hostel(hostel));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.hostels;
    }
    return this.hostels.filter((hostel) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = hostel[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return hostel;
            } else if (field === params[key]) {
              return hostel;
            }
          }
      }
      return null;
    });
  }

  add(hostel: Hostel) {
    this.hostels.push(hostel);
  }

  delete(hostel: Hostel) {
    this.hostels.splice(this.hostels.indexOf(hostel), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getHostel(queryString).pipe(
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
    const proRes = this.apiService.postHostel(data).pipe(
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

  async recordUpdate(hostel: Hostel, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateHostel(hostel.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(hostel);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
