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
  selector: 'app-egitim',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './egitim.component.html'
})
export class EgitimComponent {
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

    for (const e of this.form) {
      if (
        (e.egitim_tipi && e.egitim_tipi !== '') ||
        (e.mezuniyet_tarihi && e.mezuniyet_tarihi !== '') ||
        (e.universite_adi && e.universite_adi !== '') ||
        (e.bolum_adi && e.bolum_adi !== '') ||
        (e.lise_adi && e.lise_adi !== '')
      ) {
        e.aday_id = aday_id;
        this.api.saveEgitim(e).subscribe({
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
    if (!gonderildi) {
      this.hata = 'En az bir eğitim bilgisi doldurun!';
    }
  }

  prev() {
    this.geri.emit();
  }
}