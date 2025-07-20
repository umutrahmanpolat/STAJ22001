import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-goruntule',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './goruntule.component.html',
  styleUrls: ['./goruntule.component.css']
})
export class CvGoruntuleComponent implements OnInit {
  cv: any;
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    const aday_id = localStorage.getItem('aday_id');
    if (!aday_id) return;
    this.api.getCv(aday_id).subscribe((res: any) => this.cv = res);
  }

  geri() {
    this.router.navigate(['/login']);
  }

  anaSayfa() {
    this.router.navigate(['/']);
  }
}