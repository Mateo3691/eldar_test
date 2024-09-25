import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-field-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-error.component.html',
  styleUrl: './field-error.component.scss'
})
export class FieldErrorComponent {
  errTypeMessages = {
    required: () => 'Tenés que completar este campo',
    minlength: (params: any) =>
      'Tenés que ingresar al menos ' + params.requiredLength + ' caracteres'
  }

  @Input() control: AbstractControl | undefined;

  get showErrors() {
    return Boolean(this.control && this.control.errors && this.control.touched);
  }

  errorList(): any {
    const errors = this.control?.errors;
 
    if (errors) {
      return Object.keys(errors).map(key =>
        this.getMessage(key as keyof typeof this.errTypeMessages, errors[key])
      );
    }

    return [];
  }

  /**
   * Agrego que el tipo que espere sea el tipo de dato que tienen las claves del
   * objeto en cuestión
   */

  getMessage(type: keyof typeof this.errTypeMessages, params: any) {
    return this.errTypeMessages[type](params);
  }
}
