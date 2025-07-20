import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
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
      <h2>Giriş Yap</h2>
      <form #loginForm="ngForm" (ngSubmit)="login()" autocomplete="off">
        <div class="mb-3">
          <input type="text" [(ngModel)]="username" name="username" class="form-control" placeholder="Kullanıcı Adı" required>
        </div>
        <div class="mb-3">
          <input type="password" [(ngModel)]="password" name="password" class="form-control" placeholder="Şifre" required>
        </div>
        <button class="btn w-100" type="submit" [disabled]="loginForm.invalid">Giriş Yap</button>
      </form>
      <div *ngIf="error" class="alert alert-danger mt-3">{{error}}</div>
      <a class="btn w-100 mt-3" routerLink="/register">Kayıt Ol</a>
    </div>
  </div>
</div>
  `,
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    const lastUser = localStorage.getItem('lastRegisteredUser');
    if (lastUser) {
      const user = JSON.parse(lastUser);
      this.username = user.kullanici_adi || '';
    }
  }

  login() {
    this.error = '';
    this.api.login({ kullanici_adi: this.username, sifre: this.password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        localStorage.removeItem('lastRegisteredUser');
        this.router.navigate(['/cv']);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Kullanıcı adı veya şifre hatalı.';
      }
    });
  }
}