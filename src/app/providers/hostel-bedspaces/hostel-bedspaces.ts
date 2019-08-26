import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HostelBedspace, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class HostelBedspaces {

  hostelBedspaces: HostelBedspace[] = [];

  constructor(private apiService: ApiService) {
    const hostelBedspaces = []; // Initial Values
    for (const hostelBedspace of hostelBedspaces) {
      this.hostelBedspaces.push(new HostelBedspace(hostelBedspace));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.hostelBedspaces;
    }
    return this.hostelBedspaces.filter((hostelBedspace) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = hostelBedspace[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return hostelBedspace;
            } else if (field === params[key]) {
              return hostelBedspace;
            }
          }
      }
      return null;
    });
  }

  add(hostelBedspace: HostelBedspace) {
    this.hostelBedspaces.push(hostelBedspace);
  }

  delete(hostelBedspace: HostelBedspace) {
    this.hostelBedspaces.splice(this.hostelBedspaces.indexOf(hostelBedspace), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getHostelBedspace(queryString).pipe(
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
    const proRes = this.apiService.postHostelBedspace(data).pipe(
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

  async recordUpdate(hostelBedspace: HostelBedspace, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateHostelBedspace(hostelBedspace.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(hostelBedspace);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
