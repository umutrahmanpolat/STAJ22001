import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

function getAdayId(): string | undefined {
  const user = localStorage.getItem('user');
  if (user) {
    const u = JSON.parse(user);
    return u.aday_id || u.id;
  }
  return undefined;
}

@Component({
  selector: 'app-tercih',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tercih.component.html'
})
export class TercihComponent implements OnInit {
  @Input() form: any = {};
  @Output() formChange = new EventEmitter<any>();
  @Output() ileri = new EventEmitter<void>();
  @Output() geri = new EventEmitter<void>();

  iller: any[] = [];
  ilceler: any[] = [];
  kayitHatasi: string = '';
  kayitBasarili: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getIller().subscribe(data => {
      this.iller = Array.isArray(data) ? data : [];
      if (this.form && this.form.calismak_istedigi_il) {
        this.ilSecildi(this.form.calismak_istedigi_il);
      }
    });
  }

  ilSecildi(ilId: number) {
    if (!ilId) {
      this.ilceler = [];
      this.form.calismak_istedigi_ilce = null;
      this.formChange.emit(this.form);
      return;
    }
    this.api.getIlceler(ilId).subscribe(data => {
      this.ilceler = Array.isArray(data) ? data : [];
      this.form.calismak_istedigi_ilce = null; 
      this.formChange.emit(this.form);
    });
  }

  next() {
    const aday_id = getAdayId();
    this.form.aday_id = aday_id;

    this.api.saveTercih({
      aday_id: aday_id,
      calismak_istedigi_il: this.form.calismak_istedigi_il,
      calismak_istedigi_ilce: this.form.calismak_istedigi_ilce
    }).subscribe({
      next: () => {
        this.kayitBasarili = true;
        this.kayitHatasi = '';
        this.formChange.emit(this.form);
        this.ileri.emit();
      },
      error: err => {
        this.kayitBasarili = false;
        this.kayitHatasi = 'Tercih kaydedilemedi: ' + (err?.error?.error || 'Bilinmeyen hata');
        alert(this.kayitHatasi);
      }
    });
  }

  prev() {
    this.geri.emit();
  }
}