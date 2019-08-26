import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HostelRoom, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class HostelRooms {

  hostelRooms: HostelRoom[] = [];

  constructor(private apiService: ApiService) {
    const hostelRooms = []; // Initial Values
    for (const hostelRoom of hostelRooms) {
      this.hostelRooms.push(new HostelRoom(hostelRoom));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.hostelRooms;
    }
    return this.hostelRooms.filter((hostelRoom) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = hostelRoom[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return hostelRoom;
            } else if (field === params[key]) {
              return hostelRoom;
            }
          }
      }
      return null;
    });
  }

  add(hostelRoom: HostelRoom) {
    this.hostelRooms.push(hostelRoom);
  }

  delete(hostelRoom: HostelRoom) {
    this.hostelRooms.splice(this.hostelRooms.indexOf(hostelRoom), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getHostelRoom(queryString).pipe(
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
    const proRes = this.apiService.postHostelRoom(data).pipe(
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

  async recordUpdate(hostelRoom: HostelRoom, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateHostelRoom(hostelRoom.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(hostelRoom);
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }
}
