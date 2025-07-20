import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-aday',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './aday.component.html',
  styleUrls:[]
})
export class AdayComponent implements OnInit {
  @Input() form: any = {};
  @Output() formChange = new EventEmitter<any>();
  @Output() ileri = new EventEmitter<void>();
  @Output() geri = new EventEmitter<void>();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    
    if (!this.form || Object.keys(this.form).length === 0) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.form = {
        ad: user.ad || '',
        soyad: user.soyad || '',
        telefon: user.telefon || '',
        tc_no: user.tc_no || '',
        e_posta: user.e_posta || '',
        sifre: user.sifre || '',
        medeni_durum: '',
        egitim_duzeyi: '',
        askerlik: '',
        askerlik_aciklama: '',
        askerlik_tarihi: '',
        fotograf: '',
        il: '',
        ilce: '',
        cinsiyet: '',
        dogum_tarihi: '',
        dogum_yili: ''
      };
      this.formChange.emit(this.form);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['form'] && changes['form'].currentValue) {
      Object.assign(this.form, changes['form'].currentValue);
    }
  }

  next() {
    this.api.saveAday(this.form).subscribe((res: any) => {
      if (res.aday_id || res.ID || res.id) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.aday_id = res.aday_id || res.ID || res.id;
        localStorage.setItem('user', JSON.stringify(user));
      }
      this.formChange.emit(this.form);
      this.ileri.emit();
    });
  }
}