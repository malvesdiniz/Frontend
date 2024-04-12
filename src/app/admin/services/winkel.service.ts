import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Winkel } from '../models/winkel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WinkelService {
  constructor(private http: HttpClient) {}

  getWinkels(): Observable<Winkel[]> {
    return this.http.get<Winkel[]>(`https://localhost:7135/api/Winkel`);
  }
}
