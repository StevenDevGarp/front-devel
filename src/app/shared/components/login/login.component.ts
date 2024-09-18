import { Component } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.user, this.password).subscribe({
      next: () => this.router.navigate(['/news-list']),
      error: () => alert('Usuario o contraseña incorrectos')
    })
  }

}
