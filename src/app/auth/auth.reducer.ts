import { createReducer, on } from '@ngrx/store';
import { UserAuth } from '../core/models/user.model';
import * as act from './auth.actions';

const initState: UserAuth = {
    username: "",
    role: "",
    logedin: false,
    token: ""
}

export const authReducer = createReducer(
    initState,
    on(act.loginSuccess, (state, { username, role , token }) => ({ ...state, username, role , token, logedin: true })),
    on(act.logout, () => initState)
);
