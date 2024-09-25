import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { login } from '../auth/auth.actions';
import { LoadFormsService } from '../core/services/load-forms.service';
import { FieldErrorComponent } from '../shared/field-error/field-error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FieldErrorComponent,
    MessagesModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loadFormSrv = inject(LoadFormsService);
  store = inject(Store);
  
  loginForm: FormGroup = this.loadFormSrv.loginForm();

  showCredencialError: WritableSignal<boolean> = signal(false);

  get formValid() {
    return this.loginForm.valid;
  }

  messages = [
    { severity: 'error', summary: 'Error', detail: 'Credenciales no válidas' },
  ];

  validateLoginForm(): void {
    const req = this.loginForm.value;
    this.store.dispatch(login({ ...req }));
  }
}
