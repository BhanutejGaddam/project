import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
// import { RouterLink } from '@angular/router';
import { WarrantyService } from '../Services/warranty.service';
import { Warranty } from '../Models/warranty.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-warranty-list',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './warranty-list.component.html',
  styleUrls: ['./warranty-list.component.css']
})
export class WarrantyListComponent implements OnInit {
  warranties$!: Observable<Warranty[]>;

  constructor(private service: WarrantyService) {}

  ngOnInit() {
    this.warranties$ = this.service.list();
  }

  remove(id: number) {
    this.service.delete(id);
  }
}
