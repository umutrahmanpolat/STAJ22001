import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(private http: HttpClient) {}

  getIller(): Observable<any[]> {
    return this.http.get<any[]>('/api/iller');
  }

  getIlceler(ilId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/ilceler/${ilId}`);
  }
}