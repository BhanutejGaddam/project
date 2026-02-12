import { Component, inject, OnInit } from '@angular/core';
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
  private service = inject(WarrantyService);

  ngOnInit() { this.load(); }

  load() { this.warranties$ = this.service.list(); }

  remove(vehicleId: string) {
  if (confirm(`Are you sure you want to delete vehicle: ${vehicleId}?`)) {
    this.service.delete(vehicleId).subscribe({
      next: (res) => {
        console.log('Delete successful');
        this.load(); // Refresh the table after deletion
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Could not delete the record. Check if the backend is running.');
      }
    });
  }
}
}
