import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { State, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class States {

  states: State[] = [];

  constructor(private apiService: ApiService) {
    const states = []; // Initial Values
    for (const state of states) {
      this.states.push(new State(state));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.states;
    }
    return this.states.filter((state) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = state[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return state;
            } else if (field === params[key]) {
              return state;
            }
          }
      }
      return null;
    });
  }

  add(state: State) {
    this.states.push(state);
  }

  delete(state: State) {
    this.states.splice(this.states.indexOf(state), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getState(queryString).pipe(
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
