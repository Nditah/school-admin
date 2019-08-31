import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Curriculum, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Curriculums {

  curriculums: Curriculum[] = [];

  constructor(private apiService: ApiService) {
    const curriculums = []; // Initial Values
    for (const curriculum of curriculums) {
      this.curriculums.push(new Curriculum(curriculum));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.curriculums;
    }
    return this.curriculums.filter((curriculum) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = curriculum[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return curriculum;
            } else if (field === params[key]) {
              return curriculum;
            }
          }
      }
      return null;
    });
  }

  add(curriculum: Curriculum) {
    this.curriculums.push(curriculum);
  }

  delete(curriculum: Curriculum) {
    this.curriculums.splice(this.curriculums.indexOf(curriculum), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getCurriculum(queryString).pipe(
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
    const proRes = this.apiService.postCurriculum(data).pipe(
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

  async recordUpdate(curriculum: Curriculum, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateCurriculum(curriculum.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(curriculum);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
