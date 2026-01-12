import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


type Theme = 'light' | 'dark'; // <-- define the union type (fixes "Theme" not found)

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
 theme: Theme = 'light';
  private readonly STORAGE_KEY = 'autoconnect-theme';

  ngOnInit(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    if (saved === 'light' || saved === 'dark') {
      this.theme = saved;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme = prefersDark ? 'dark' : 'light';
    }
    localStorage.setItem(this.STORAGE_KEY, this.theme);

    // Optional: react to system theme changes
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener('change', e => {
      // Only change if user hasn't overridden later:
      const cur = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
      if (cur !== 'light' && cur !== 'dark') {
        this.theme = e.matches ? 'dark' : 'light';
      }
    });
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(this.STORAGE_KEY, this.theme);
  }

}
