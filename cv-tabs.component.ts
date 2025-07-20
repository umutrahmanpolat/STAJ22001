import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgSwitch, NgSwitchCase, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

import { AdayComponent } from './aday.component';
import { EgitimComponent } from './egitim.component';
import { IsDeneyimComponent } from './is-deneyim.component';
import { YetkinlikComponent } from './yetkinlik.component';
import { SosyalComponent } from './sosyal.component';
import { ReferansComponent } from './referans.component';
import { TercihComponent } from './tercih.component';
import { OzetComponent } from './ozet.component';

function getAdayId(): string | undefined {
  const user = localStorage.getItem('user');
  if (user) {
    const u = JSON.parse(user);
    return u.aday_id || u.id;
  }
  return undefined;
}

@Component({
  selector: 'app-cv-tabs',
  standalone: true,
  imports: [
    NgIf, NgFor, NgSwitch, NgSwitchCase, FormsModule,
    AdayComponent, EgitimComponent, IsDeneyimComponent, YetkinlikComponent,
    SosyalComponent, ReferansComponent, TercihComponent, OzetComponent
  ],
  templateUrl: './cv-tabs.component.html',
})
export class CvTabsComponent implements OnInit {
  tabs = [
    { label: 'Aday', key: 'aday' },
    { label: 'Eğitim', key: 'egitim' },
    { label: 'İş Deneyimi', key: 'isDeneyim' },
    { label: 'Yetkinlik', key: 'yetkinlik' },
    { label: 'Sosyal', key: 'sosyal' },
    { label: 'Referans', key: 'referans' },
    { label: 'Tercih', key: 'tercih' },
    { label: 'Özet', key: 'ozet' }
  ];
  selectedTab = 0;
  showCv = false;
  kayitHatasi: string = '';
  kayitBasarili: boolean = false;

  cvForm: any = {
    aday: {},
    egitim: [],
    isDeneyim: [],
    yetkinlik: [],
    sosyal: [],
    referans: [],
    tercih: {},
    ozet: {}
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const aday_id = user?.aday_id || user?.id;

    if (aday_id) {
      this.api.getCv(aday_id).subscribe((cv: any) => {
        if (cv) {
        
          Object.assign(this.cvForm.aday, cv.aday || {});
          this.cvForm.egitim = Array.isArray(cv.egitim) ? cv.egitim : (cv.egitim ? [cv.egitim] : []);
          this.cvForm.isDeneyim = Array.isArray(cv.isDeneyim) ? cv.isDeneyim : (cv.isDeneyim ? [cv.isDeneyim] : []);
          this.cvForm.yetkinlik = Array.isArray(cv.yetkinlik) ? cv.yetkinlik : (cv.yetkinlik ? [cv.yetkinlik] : []);
          this.cvForm.sosyal = Array.isArray(cv.sosyal) ? cv.sosyal : (cv.sosyal ? [cv.sosyal] : []);
          this.cvForm.referans = Array.isArray(cv.referans) ? cv.referans : (cv.referans ? [cv.referans] : []);
          this.cvForm.tercih = cv.tercih || {};
          this.cvForm.ozet = cv.ozet || {};
        }
      });

      this.api.getOzet(aday_id).subscribe((ozet: any) => {
        if (ozet) {
          this.cvForm.ozet = { ozet: ozet.ozet };
        }
      });
    }
  }

  selectTab(i: number) {
    this.selectedTab = i;
    this.showCv = false;
    this.kayitHatasi = '';
    this.kayitBasarili = false;
  }

  nextTab() {
    if (this.selectedTab < this.tabs.length - 1) {
      this.selectedTab++;
    }
  }

  prevTab() {
    if (this.selectedTab > 0) {
      this.selectedTab--;
    }
  }

  kaydetVeGoruntule() {
    this.kayitHatasi = '';
    this.kayitBasarili = false;

    const aday_id = getAdayId();
    if (aday_id) {
      this.cvForm.aday.id = aday_id;
      this.cvForm.aday.ID = aday_id;
      this.cvForm.aday_id = aday_id;
      if (this.cvForm.tercih) this.cvForm.tercih.aday_id = aday_id;
      if (this.cvForm.egitim) this.cvForm.egitim.forEach((e: any) => e.aday_id = aday_id);
      if (this.cvForm.isDeneyim) this.cvForm.isDeneyim.forEach((i: any) => i.aday_id = aday_id);
      if (this.cvForm.yetkinlik) this.cvForm.yetkinlik.forEach((y: any) => y.aday_id = aday_id);
      if (this.cvForm.sosyal) this.cvForm.sosyal.forEach((s: any) => s.aday_id = aday_id);
      if (this.cvForm.referans) this.cvForm.referans.forEach((r: any) => r.aday_id = aday_id);
    }

    this.api.cvKaydet(this.cvForm)?.subscribe({
      next: (res) => {
        if (res && res.aday_id) {
          let user = JSON.parse(localStorage.getItem('user') || '{}');
          user.aday_id = res.aday_id;
          localStorage.setItem('user', JSON.stringify(user));

          this.cvForm.aday.id = res.aday_id;
          this.cvForm.aday.ID = res.aday_id;
          this.cvForm.aday_id = res.aday_id;
          if (this.cvForm.tercih) this.cvForm.tercih.aday_id = res.aday_id;
          if (this.cvForm.egitim) this.cvForm.egitim.forEach((e: any) => e.aday_id = res.aday_id);
          if (this.cvForm.isDeneyim) this.cvForm.isDeneyim.forEach((i: any) => i.aday_id = res.aday_id);
          if (this.cvForm.yetkinlik) this.cvForm.yetkinlik.forEach((y: any) => y.aday_id = res.aday_id);
          if (this.cvForm.sosyal) this.cvForm.sosyal.forEach((s: any) => s.aday_id = res.aday_id);
          if (this.cvForm.referans) this.cvForm.referans.forEach((r: any) => r.aday_id = res.aday_id);
        }
        this.kayitBasarili = true;
        this.showCv = true;
      },
      error: (err) => {
        this.kayitHatasi = 'Kayıt sırasında hata oluştu.';
        console.error(err);
      }
    });
  }
}