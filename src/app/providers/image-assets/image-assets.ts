import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageAsset, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class ImageAssets {

  imageAssets: ImageAsset[] = [];

  constructor(private apiService: ApiService) {
    const imageAssets = []; // Initial Values
    for (const imageAsset of imageAssets) {
      this.imageAssets.push(new ImageAsset(imageAsset));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.imageAssets;
    }
    return this.imageAssets.filter((imageAsset) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = imageAsset[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return imageAsset;
            } else if (field === params[key]) {
              return imageAsset;
            }
          }
      }
      return null;
    });
  }

  add(imageAsset: ImageAsset) {
    this.imageAssets.push(imageAsset);
  }

  delete(imageAsset: ImageAsset) {
    this.imageAssets.splice(this.imageAssets.indexOf(imageAsset), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getImageAsset(queryString).pipe(
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
    const proRes = this.apiService.postImageAsset(data).pipe(
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

  async recordUpdate(imageAsset: ImageAsset, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateImageAsset(imageAsset.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          console.log('recordUpdate() successful');
          this.delete(imageAsset);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
