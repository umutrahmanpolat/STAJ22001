import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aday {
  
}

@Injectable({
  providedIn: 'root'
})
export class AdayService {
  private apiUrl = 'http://localhost:3000/api/aday';

  constructor(private http: HttpClient) {}

  adayEkle(aday: Aday): Observable<any> {
    return this.http.post(this.apiUrl, aday);
  }
}
