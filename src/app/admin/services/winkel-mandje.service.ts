import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MandjeItem } from '../models/mandje-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WinkelMandjeService {
  constructor(private http: HttpClient) {}

  getMandjeItem(): Observable<MandjeItem[]> {
    return this.http.get<MandjeItem[]>(`https://localhost:7135/api/MandjeItem`);
  }

  postMandjeItem(mandjeItem: MandjeItem): Observable<MandjeItem[]> {
    return this.http.post<MandjeItem[]>(
      `https://localhost:7135/api/MandjeItem`,
      mandjeItem
    );
  }

  getTotaal(): Observable<number> {
    return this.http.get<number>(
      `https://localhost:7135/api/MandjeItem/totaal`
    );
  }

  deleteMandjeItem(id: number): Observable<MandjeItem[]> {
    return this.http.delete<MandjeItem[]>(
      `https://localhost:7135/api/MandjeItem/${id}`
    );
  }
}
