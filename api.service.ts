import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  api = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  
  login(data: any) { return this.http.post(`${this.api}/login`, data); }
  register(data: any) { return this.http.post(`${this.api}/register`, data); }

  saveAday(data: any) { return this.http.post(`${this.api}/aday`, data); }
  saveEgitim(data: any) { return this.http.post(`${this.api}/egitim`, data); }
  saveIsDeneyim(data: any) { return this.http.post(`${this.api}/is-deneyim`, data); }
  saveYetkinlik(data: any) { return this.http.post(`${this.api}/yetkinlik`, data); }
  saveSosyal(data: any) { return this.http.post(`${this.api}/sosyal`, data); }
  saveReferans(data: any) { return this.http.post(`${this.api}/referans`, data); }
  saveTercih(data: any) { return this.http.post(`${this.api}/tercih`, data); }

 
  saveOzet(data: any): Observable<any> {
    return this.http.post(`${this.api}/ozet`, data);
  }
  getOzet(aday_id: any): Observable<any> {
    return this.http.get(`${this.api}/ozet/${aday_id}`);
  }

  
  cvKaydet(cvForm: any): Observable<any> {
    return this.http.post(`${this.api}/cv/kaydet`, cvForm);
  }

 
  getCv(aday_id: any): Observable<any> {
    return this.http.get(`${this.api}/cv/${aday_id}`);
  }

  
  getIller(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/iller`);
  }
  getIlceler(ilId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/ilceler/${ilId}`);
  }
}