import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { CvGoruntuleComponent } from './cv/goruntule.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cv', loadComponent: () => import('./cv/cv-tabs.component').then(m => m.CvTabsComponent) },
  { path: 'cv/goruntule', component: CvGoruntuleComponent },
  { path: 'cv/egitim', loadComponent: () => import('./cv/egitim.component').then(m => m.EgitimComponent) },
  { path: 'cv/is-deneyim', loadComponent: () => import('./cv/is-deneyim.component').then(m => m.IsDeneyimComponent) },
  { path: 'cv/yetkinlik', loadComponent: () => import('./cv/yetkinlik.component').then(m => m.YetkinlikComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }