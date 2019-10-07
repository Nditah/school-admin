import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Asset, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Assets {

  assets: Asset[] = [];

  constructor(private apiService: ApiService) {
    const assets = []; // Initial Values
    for (const asset of assets) {
      this.assets.push(new Asset(asset));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.assets;
    }
    return this.assets.filter((asset) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = asset[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return asset;
            } else if (field === params[key]) {
              return asset;
            }
          }
      }
      return null;
    });
  }

  add(asset: Asset) {
    this.assets.push(asset);
  }

  delete(asset: Asset) {
    this.assets.splice(this.assets.indexOf(asset), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getAsset(queryString).pipe(
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
    const proRes = this.apiService.postAsset(data).pipe(
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

  async recordUpdate(asset: Asset, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateAsset(asset.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          console.log('recordUpdate() successful');
          this.delete(asset);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
