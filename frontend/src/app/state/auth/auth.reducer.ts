import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { RegisterPayload, RegisterResponse, UserLoggedInProfile, LoginPayload, LoginResponse }
    from '../../shared/models/auth.model';

export interface AuthState {
    user: UserLoggedInProfile | null;
    token: string | null;
    loading: boolean | null;
    error: string | null;
}


export const initialAuthState: AuthState = {
    user: null,
    token: null,
    loading: null,
    error: null
};

export const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.loginRequest, AuthActions.registerRequest, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AuthActions.loginSuccess, (state, { loginResponse, token }) => ({
        ...state,
        user: loginResponse.user,
        token,
        loading: false,
        error: null
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state, loading: false,
        error
    })),
    on(AuthActions.registerSuccess, (state, { registerResponse }) => ({
        ...state,
        ...registerResponse,
        loading: false,
        error: null
    })),
    on(AuthActions.registerFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
)