import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parent, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Parents {

  parents: Parent[] = [];

  constructor(private apiService: ApiService) {
    const parents = []; // Initial Values
    for (const parent of parents) {
      this.parents.push(new Parent(parent));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.parents;
    }
    return this.parents.filter((parent) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = parent[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return parent;
            } else if (field === params[key]) {
              return parent;
            }
          }
      }
      return null;
    });
  }

  add(parent: Parent) {
    this.parents.push(parent);
  }

  delete(parent: Parent) {
    this.parents.splice(this.parents.indexOf(parent), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getParent(queryString).pipe(
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
    const proRes = this.apiService.postParent(data).pipe(
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

  async recordUpdate(parent: Parent, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateParent(parent.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(parent);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }

}
