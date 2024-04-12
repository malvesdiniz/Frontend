import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MandjeItem } from '../models/mandje-item';

@Injectable({
  providedIn: 'root',
})
export class MuntService {
  constructor(private http: HttpClient) {}

  getMunt(): Observable<any> {
    return this.http.get(`https://localhost:7135/api/MandjeItem/munt`, {
      responseType: 'text',
    });
  }

  muntWisselen(): Observable<MandjeItem[]> {
    return this.http.put<MandjeItem[]>(
      `https://localhost:7135/api/MandjeItem/changeMunt`,
      null
    );
  }
}
