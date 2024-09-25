import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { login, loginSuccess } from './auth.actions';
import { AuthService } from './auth.service';

export class AuthEffects {
  router = inject(Router);
  actions$ = inject(Actions);
  authService = inject(AuthService);

  // Mnejo el login
  login$ = createEffect(() =>
    this.actions$.pipe(
        ofType(login),
        switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
        map((response) => {
            const { username, role , token } = response;
            // Redirigir al dashboard según el rol
            this.router.navigate(['/dashboard']);
            return loginSuccess({ username, role, token });
        }) // en este caso, por como lo hice, no daría error el login. Pero en un caso real habría que poner un control
        ))
        )
    );
}