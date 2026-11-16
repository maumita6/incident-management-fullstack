import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterPayload, RegisterResponse, UserLoggedInProfile, LoginPayload, LoginResponse }
    from '../../shared/models/auth.model';


export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Login Request': props<{ email: string; password: string }>(),
        'Login Success': props<{ loginResponse: LoginResponse; token: string }>(),
        'Login Failure': props<{ error: string }>(),

        // register
        'Register Request': props<{ username: string, email: string, password: string, confirmPassword: string, roles: string }>(),
        'Register Success': props<{ registerResponse: RegisterResponse }>(),
        'Register Failure': props<{ error: string }>(),

        'Logout': emptyProps(),
        'Logout Success': emptyProps(),
        'Logout Failure': props<{ error: string }>(),

        'Get Logged Users': emptyProps(),
        'Get Logged Users Success': props<{ users: any[] }>(),
        'Get Logged Users Failure': props<{ error: string }>()
    }
});
