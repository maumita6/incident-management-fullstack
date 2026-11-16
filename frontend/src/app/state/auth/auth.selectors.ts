import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

//entire authentication feature slice from the global store
export const selectAuthState = createFeatureSelector<AuthState>('authConfig');

console.log(selectAuthState);

export const selectCurrentUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.user
);

//session authentication status boolean 
export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => !!state.token
);

export const selectToken = createSelector(
    selectAuthState,
    (state: AuthState) => state.token
);

export const selectUserRoles = createSelector(
    selectAuthState,
    (state: AuthState) => state.user?.roles || []
);

export const selectUserEmail = createSelector(
    selectAuthState,
    (state: AuthState) => state.user?.email || ''
);

export const selectUserId = createSelector(
    selectAuthState,
    (state: AuthState) => state.user?.id || ''
);

export const selectUserCreatedAt = createSelector(
    selectAuthState,
    (state: AuthState) => state.user?.createdAt || null
);

export const selectUserUsername = createSelector(
    selectAuthState,
    (state: AuthState) => state.user?.username || ''
);

export const selectLoading = createSelector(
    selectAuthState,
    (state: AuthState) => state.loading
);

export const selectError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
);