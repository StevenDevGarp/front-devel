import { Component } from '@angular/core';
import { RegisterService } from '@service/register.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: string = "";
  password: string = "";
  fullName: string = "";
  email: string = "";

  constructor(private register: RegisterService, private router: Router) {}

  registerUser(): void {
    this.register.register(this.user, this.password, this.fullName, this.email).subscribe({
      next: () => this.router.navigate(['/news-list']),
      error: () => alert('Usuario o contraseña incorrectos')
    })
  }
}
