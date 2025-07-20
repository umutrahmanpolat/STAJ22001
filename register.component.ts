import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  template: `

  <div class="login-page">
  <div class="login-image">
    <img src="assets/vakf_kpk_001.jpg" alt="Vakıfbank Logo">
  </div>
  <div class="login-container">
    <div class="login-content">
      <div class="form-side">
        <h2>Kayıt Ol</h2>
        <form #registerForm="ngForm" (ngSubmit)="register()" autocomplete="off">
          <div class="mb-3">
            <input type="text" [(ngModel)]="ad" name="ad" class="form-control" placeholder="Ad" required>
          </div>
          <div class="mb-3">
            <input type="text" [(ngModel)]="soyad" name="soyad" class="form-control" placeholder="Soyad" required>
          </div>
          <div class="mb-3">
            <input type="text" [(ngModel)]="telefon" name="telefon" class="form-control" placeholder="Telefon" required>
          </div>
          <div class="mb-3">
            <input type="text" [(ngModel)]="tc_no" name="tc_no" class="form-control" placeholder="TC Kimlik No" required>
          </div>
          <div class="mb-3">
            <input type="text" [(ngModel)]="kullanici_adi" name="kullanici_adi" class="form-control" placeholder="Kullanıcı Adı" required>
          </div>
          <div class="mb-3">
            <input type="email" [(ngModel)]="e_posta" name="e_posta" class="form-control" placeholder="E-posta" required>
          </div>
          <div class="mb-3">
            <input type="password" [(ngModel)]="sifre" name="sifre" class="form-control" placeholder="Şifre" required>
          </div>
          <button class="btn w-100" type="submit" [disabled]="registerForm.invalid">Kayıt Ol</button>
        </form>
        <div *ngIf="error" class="alert alert-danger mt-3">{{error}}</div>
        <a class="btn w-100 mt-3" routerLink="/login">Giriş Yap</a>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls:['./register.component.css']
})
export class RegisterComponent {
  ad = '';
  soyad = '';
  telefon = '';
  tc_no = '';
  kullanici_adi = '';
  e_posta = '';
  sifre = '';
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  register() {
    this.error = '';
    this.api.register({
      kullanici_adi: this.kullanici_adi,
      e_posta: this.e_posta,
      sifre: this.sifre,
      ad: this.ad,
      soyad: this.soyad,
      telefon: this.telefon,
      tc_no: this.tc_no
    }).subscribe({
      next: (res: any) => {
        if (res && res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('lastRegisteredUser', JSON.stringify(res.user));
          this.router.navigate(['/login']);
        } else if (res && res.success) {
          this.router.navigate(['/login']);
        } else {
          this.error = 'Kayıt sırasında beklenmeyen bir hata oluştu.';
        }
      },
      error: (err) => {
        this.error = err?.error?.message || JSON.stringify(err) || 'Kayıt başarısız. Kullanıcı adı veya e-posta zaten kayıtlı olabilir.';
      }
    });
  }
}