import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Students {

  students: Student[] = [];

  constructor(private apiService: ApiService) {
    const students = []; // Initial Values
    for (const student of students) {
      this.students.push(new Student(student));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.students;
    }
    return this.students.filter((student) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = student[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return student;
            } else if (field === params[key]) {
              return student;
            }
          }
      }
      return null;
    });
  }

  add(student: Student) {
    this.students.push(student);
  }

  delete(student: Student) {
    this.students.splice(this.students.indexOf(student), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getStudent(queryString).pipe(
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
    const proRes = this.apiService.postStudent(data).pipe(
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

  async recordUpdate(student: Student, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateStudent(student.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(student);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }

}
