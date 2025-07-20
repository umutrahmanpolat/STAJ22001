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
  selector: 'app-referans',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './referans.component.html'
})
export class ReferansComponent {
  @Input() form: any[] = [{}];
  @Output() formChange = new EventEmitter<any[]>();
  @Output() ileri = new EventEmitter<void>();
  @Output() geri = new EventEmitter<void>();

  hata: string = '';
  basarili: boolean = false;

  constructor(private api: ApiService) {}

  next() {
    this.hata = '';
    this.basarili = false;
    const aday_id = getAdayId();
    let gonderildi = false;

    for (const r of this.form) {
      if (
        (r.referans_ad && r.referans_ad !== '') ||
        (r.referans_soyad && r.referans_soyad !== '') ||
        (r.unvan && r.unvan !== '') ||
        (r.referans_telefon && r.referans_telefon !== '') ||
        (r.gorev_veri && r.gorev_veri !== '')
      ) {
        r.aday_id = aday_id;
        this.api.saveReferans(r).subscribe({
          next: () => {
            gonderildi = true;
            this.basarili = true;
            this.formChange.emit(this.form);
            this.ileri.emit();
          },
          error: (err) => {
            this.hata = 'Kayıt sırasında hata oluştu';
          }
        });
      }
    }
    if (!gonderildi) this.hata = 'En az bir referans bilgisi girin!';
  }

  prev() {
    this.geri.emit();
  }
}