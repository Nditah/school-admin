import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Courses {

  courses: Course[] = [];

  constructor(private apiService: ApiService) {
    const courses = []; // Initial Values
    for (const course of courses) {
      this.courses.push(new Course(course));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.courses;
    }
    return this.courses.filter((course) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = course[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return course;
            } else if (field === params[key]) {
              return course;
            }
          }
      }
      return null;
    });
  }

  add(course: Course) {
    this.courses.push(course);
  }

  delete(course: Course) {
    this.courses.splice(this.courses.indexOf(course), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getCourse(queryString).pipe(
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
    const proRes = this.apiService.postCourse(data).pipe(
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

  async recordUpdate(course: Course, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateCourse(course.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(course);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
