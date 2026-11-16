import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth';
import { AuthActions } from './auth.actions';
import { RegisterPayload, RegisterResponse, UserLoggedInProfile, LoginPayload, LoginResponse }
    from '../../shared/models/auth.model';
import { Router } from '@angular/router';


@Injectable()

export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);

    loginEffect$ = createEffect(() =>
        // actions$ stream of every action dispatched in the application.
        this.actions$.pipe(
            ofType(AuthActions.loginRequest), // Only login action
            exhaustMap(({ email, password }) =>
                this.authService.login(email, password).pipe(
                    map((loginResponse) => {
                        if (loginResponse.success) {
                            return AuthActions.loginSuccess({
                                loginResponse,
                                token: loginResponse.token,
                            });
                        } else {
                            return AuthActions.loginFailure({
                                error: 'No response, Login failed',
                            });
                        }
                    }),
                    catchError((error) =>
                        of(AuthActions.loginFailure({ error: error.message || 'Server error' }))
                    ))
            )
        )
    );

    loginSuccessEffect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(({ token, loginResponse }) => {
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(loginResponse.user));
                    console.log('loginresponse', loginResponse);
                    this.router.navigate(['/incidents']);

                })
            ),
        { dispatch: false }
    );

    // register
    registerEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.registerRequest), // Only register action
            exhaustMap(({ username, email, password, confirmPassword, roles }) =>
                this.authService.register(username, email, password, confirmPassword, roles).pipe(
                    map((registerResponse) => AuthActions.registerSuccess({ registerResponse })),
                    catchError((error) => of(AuthActions.registerFailure({ error: error.message })))
                )
            )
        ),
    )


}