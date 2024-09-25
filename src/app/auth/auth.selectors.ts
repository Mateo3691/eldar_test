import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserAuth } from '../core/models/user.model';

export const selectAuthState = createFeatureSelector<UserAuth>('userAuth');

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state) => state.logedin
);
  
export const selectUserRole = createSelector(
    selectAuthState,
    (state) => state.role
);

export const selectUserName = createSelector(
    selectAuthState,
    (state) => state.username
);