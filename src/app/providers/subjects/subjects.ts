import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Subjects {

  subjects: Subject[] = [];

  constructor(private apiService: ApiService) {
    const subjects = []; // Initial Values
    for (const subject of subjects) {
      this.subjects.push(new Subject(subject));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.subjects;
    }
    return this.subjects.filter((subject) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = subject[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return subject;
            } else if (field === params[key]) {
              return subject;
            }
          }
      }
      return null;
    });
  }

  add(subject: Subject) {
    this.subjects.push(subject);
  }

  delete(subject: Subject) {
    this.subjects.splice(this.subjects.indexOf(subject), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getSubject(queryString).pipe(
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
    const proRes = this.apiService.postSubject(data).pipe(
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

  async recordUpdate(subject: Subject, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateSubject(subject.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          console.log('recordUpdate() successful');
          this.delete(subject);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
