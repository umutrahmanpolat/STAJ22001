import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-il-ilce-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './il-ilce-select.component.html',
})
export class IlIlceSelectComponent implements OnInit {
  @Input() ilId: number | null = null;
  @Input() ilceId: number | null = null;
  @Output() ilIdChange = new EventEmitter<number|null>();
  @Output() ilceIdChange = new EventEmitter<number|null>();

  iller: any[] = [];
  ilceler: any[] = [];

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.getIller().subscribe(data => this.iller = data);
    if (this.ilId) this.getIlceler(this.ilId);
  }

  onIlChange(event: Event) {
    const value = +(event.target as HTMLSelectElement).value || null;
    this.ilIdChange.emit(value);
    this.ilceIdChange.emit(null);
    if (value) this.getIlceler(value);
    else this.ilceler = [];
  }

  onIlceChange(event: Event) {
    const value = +(event.target as HTMLSelectElement).value || null;
    this.ilceIdChange.emit(value);
  }

  getIlceler(ilId: number) {
    this.locationService.getIlceler(ilId).subscribe(data => this.ilceler = data);
  }
}