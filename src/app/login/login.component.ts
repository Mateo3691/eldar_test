import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoadFormsService } from '../services/load-forms.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loadFormSrv = inject(LoadFormsService);
  loginForm: FormGroup = this.loadFormSrv.loginForm();

  get formValid() {
    return this.loginForm.valid;
  }

  validateLoginForm(): void {
    
  }
}
