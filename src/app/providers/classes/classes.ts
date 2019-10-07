import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Classe, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Classes {

  classes: Classe[] = [];

  constructor(private apiService: ApiService) {
    const classes = []; // Initial Values
    for (const classe of classes) {
      this.classes.push(new Classe(classe));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.classes;
    }
    return this.classes.filter((classe) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = classe[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return classe;
            } else if (field === params[key]) {
              return classe;
            }
          }
      }
      return null;
    });
  }

  add(classe: Classe) {
    this.classes.push(classe);
  }

  delete(classe: Classe) {
    this.classes.splice(this.classes.indexOf(classe), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getClasse(queryString).pipe(
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
    const proRes = this.apiService.postClasse(data).pipe(
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

  async recordUpdate(classe: Classe, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateClasse(classe.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(classe);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
