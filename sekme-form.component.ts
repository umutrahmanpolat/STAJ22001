import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IlIlceSelectComponent } from "../il-ilce-select/il-ilce-select.component";

@Component({
  selector: 'app-sekme-form',
  standalone: true,
  imports: [CommonModule, FormsModule, IlIlceSelectComponent],
  templateUrl: './sekme-form.component.html',
  styleUrls: ['./sekme-form.component.css']
})
export class SekmeFormComponent {
  sekmeler = [
    { id: 'kisisel', ad: 'Kişisel Bilgi' },
    { id: 'adres', ad: 'Adres Bilgi' },
    { id: 'calisma', ad: 'Çalışma Bilgisi' }
  ];
  aktif = 'kisisel';

  form = {
    kisisel: { adsoyad: '' },
    adres: { adres: '' },
    calisma: {
      il_id: null as number | null,
      ilce_id: null as number | null
    }
  };

  setAktif(id: string) {
    this.aktif = id;
  }
}