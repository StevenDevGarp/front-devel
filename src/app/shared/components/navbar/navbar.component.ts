import { Component } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goNewsList(): void {
    this.router.navigate(['/news-list']);
  }

  goHome(): void {
    this.router.navigate(['/news-list']);
  }

}
