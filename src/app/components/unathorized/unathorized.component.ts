import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unathorized',
  standalone: false,
  templateUrl: './unathorized.component.html',
  styleUrl: './unathorized.component.css'
})
export class UnathorizedComponent {
  constructor(private router: Router) {}

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
