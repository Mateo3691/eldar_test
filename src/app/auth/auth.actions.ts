import { createAction, props } from '@ngrx/store';

//login
export const login = createAction(
    '[Auth] Login',
    props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ username: string; role: string; token: string }>()
);

export const logout = createAction('[Auth] Logout');