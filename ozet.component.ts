import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-ozet',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ozet.component.html'
})
export class OzetComponent {
  @Input() form: any = {};
  @Output() formChange = new EventEmitter<any>();

  kayitHatasi: string = '';
  kayitBasarili: boolean = false;

  constructor(private api: ApiService) {}

  kaydetOzet() {
    this.kayitHatasi = '';
    this.kayitBasarili = false;
    const aday_id = getAdayId();
    const ozet = (this.form.ozet || '').trim();

    if (!aday_id) {
      this.kayitHatasi = 'Aday ID bulunamadı!';
      return;
    }
    if (!ozet) {
      this.kayitHatasi = 'Lütfen özet alanını doldurun!';
      return;
    }

    this.api.saveOzet({ aday_id, ozet }).subscribe({
      next: () => {
        this.kayitBasarili = true;
        this.formChange.emit(this.form);
      },
      error: (err) => {
        this.kayitHatasi = 'Kayıt sırasında hata oluştu: ' + (err?.error?.error || 'Bilinmeyen hata');
      }
    });
  }
}