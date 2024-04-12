import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Groente } from '../models/groente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroenteService {
  constructor(private http: HttpClient) {}

  getGroenten(): Observable<Groente[]> {
    return this.http.get<Groente[]>(`https://localhost:7135/api/Groente`);
  }
}
