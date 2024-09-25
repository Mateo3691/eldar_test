import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoadFormsService {

  fb = inject(FormBuilder);

  constructor() { }

  loginForm(): FormGroup {
    return this.fb.group({
      username: new FormControl ("", [Validators.required, Validators.minLength(5)]),
      password: new FormControl ("", [Validators.required, Validators.minLength(3)])
    }) 
  }

  tableDataForm(): FormGroup {
    return this.fb.group({
      title: new FormControl ("", [Validators.required, Validators.minLength(5)]),
      body: new FormControl ("", [Validators.required, Validators.minLength(10)]),
      userId: new FormControl (null, [Validators.required])
    })
  }
}
