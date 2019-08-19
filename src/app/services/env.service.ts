import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

@Injectable({
  providedIn: 'root'
})

export class EnvService {

  API_URL: string;
  CENTRAL_API = 'https://peacegroup-api.herokuapp.com/api';
  LOCAL_API = 'http://172.16.18.89/api';
  centralMode: true; // user control online mode
  isOnline = true;

  constructor(private connection: ConnectionService) {
    this.API_URL = this.CENTRAL_API;
    this.connection.monitor().subscribe(isConnected => {
      this.isOnline = isConnected;
      if (isConnected && this.centralMode) {
        this.API_URL = this.CENTRAL_API;
      }
    });
  }
}
