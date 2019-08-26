import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HostelAllocation, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class HostelAllocations {

  hostelAllocations: HostelAllocation[] = [];

  constructor(private apiService: ApiService) {
    const hostelAllocations = []; // Initial Values
    for (const hostelAllocation of hostelAllocations) {
      this.hostelAllocations.push(new HostelAllocation(hostelAllocation));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.hostelAllocations;
    }
    return this.hostelAllocations.filter((hostelAllocation) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = hostelAllocation[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return hostelAllocation;
            } else if (field === params[key]) {
              return hostelAllocation;
            }
          }
      }
      return null;
    });
  }

  add(hostelAllocation: HostelAllocation) {
    this.hostelAllocations.push(hostelAllocation);
  }

  delete(hostelAllocation: HostelAllocation) {
    this.hostelAllocations.splice(this.hostelAllocations.indexOf(hostelAllocation), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getHostelAllocation(queryString).pipe(
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
    const proRes = this.apiService.postHostelAllocation(data).pipe(
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

  async recordUpdate(hostelAllocation: HostelAllocation, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateHostelAllocation(hostelAllocation.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(hostelAllocation);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
