import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CvFormService {
  cvForm: any = {
    aday: {},
    egitim: {},
    isDeneyim: {},
    yetkinlik: {},
    sosyal: {},
    referans: {},
    tercih: {},
    ozet: {}
  };
  reset() {
    this.cvForm = {
      aday: {},
      egitim: {},
      isDeneyim: {},
      yetkinlik: {},
      sosyal: {},
      referans: {},
      tercih: {},
      ozet: {}
    };
  }
}