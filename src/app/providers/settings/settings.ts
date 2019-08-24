import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Setting, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Settings {

  settings: Setting[] = [];

  constructor(private apiService: ApiService) {
    const settings = []; // Initial Values
    for (const setting of settings) {
      this.settings.push(new Setting(setting));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.settings;
    }
    return this.settings.filter((setting) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = setting[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return setting;
            } else if (field === params[key]) {
              return setting;
            }
          }
      }
      return null;
    });
  }

  add(setting: Setting) {
    this.settings.push(setting);
  }

  delete(setting: Setting) {
    const index = this.settings.findIndex(setting => setting.id === setting.id);
    this.settings.splice(index, 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getSetting(queryString).pipe(
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
