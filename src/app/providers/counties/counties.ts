import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { County, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Counties {

  counties: County[] = [];

  constructor(private apiService: ApiService) {
    const counties = []; // Initial Values
    for (const county of counties) {
      this.counties.push(new County(county));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.counties;
    }
    return this.counties.filter((county) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = county[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return county;
            } else if (field === params[key]) {
              return county;
            }
          }
      }
      return null;
    });
  }

  add(county: County) {
    this.counties.push(county);
  }

  delete(county: County) {
    this.counties.splice(this.counties.indexOf(county), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getCounty(queryString).pipe(
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

}
