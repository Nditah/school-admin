import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Classroom, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Classrooms {

  classrooms: Classroom[] = [];

  constructor(private apiService: ApiService) {
    const classrooms = []; // Initial Values
    for (const classroom of classrooms) {
      this.classrooms.push(new Classroom(classroom));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.classrooms;
    }
    return this.classrooms.filter((classroom) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = classroom[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return classroom;
            } else if (field === params[key]) {
              return classroom;
            }
          }
      }
      return null;
    });
  }

  add(classroom: Classroom) {
    this.classrooms.push(classroom);
  }

  delete(classroom: Classroom) {
    this.classrooms.splice(this.classrooms.indexOf(classroom), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getClassroom(queryString).pipe(
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
    const proRes = this.apiService.postClassroom(data).pipe(
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

  async recordUpdate(classroom: Classroom, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateClassroom(classroom.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          console.log('recordUpdate() successful');
          this.delete(classroom);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
