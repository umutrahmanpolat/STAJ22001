import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IlService {
  private ilUrl = 'http://localhost:3000/api/iller';
  private ilceUrl = 'http://localhost:3000/api/ilceler';

  constructor(private http: HttpClient) {}

  illeriGetir(): Observable<any[]> {
    return this.http.get<any[]>(this.ilUrl);
  }

  ilceleriGetir(il_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.ilceUrl}/${il_id}`);
  }
}