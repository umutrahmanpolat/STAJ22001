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
  selector: 'app-sosyal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sosyal.component.html'
})
export class SosyalComponent {
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

    for (const s of this.form) {
      if (
        (s.hobiler && s.hobiler !== '') ||
        (s.uye_oldugu_topluluklar && s.uye_oldugu_topluluklar !== '') ||
        (s.sosyal_faaliyetler && s.sosyal_faaliyetler !== '')
      ) {
        s.aday_id = aday_id;
        this.api.saveSosyal(s).subscribe({
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
    if (!gonderildi) this.hata = 'En az bir sosyal faaliyet girin!';
  }

  prev() {
    this.geri.emit();
  }
}