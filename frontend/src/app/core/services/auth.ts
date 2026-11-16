
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap, of } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { RegisterPayload, RegisterResponse, UserLoggedInProfile, LoginPayload, LoginResponse } from '../../shared/models/auth.model';
import { environment } from '../../../environments/environment';
import { AuthActions } from '../../state/auth/auth.actions';

@Service()
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private store = inject(Store);

    private apiURL = `${environment.apiUrl}/users`;

    readonly currentUser = signal<UserLoggedInProfile | null>(null);
    readonly isAuthenticated = computed(() => !!this.currentUser());
    readonly isLoggedIn = computed(() => this.currentUser() !== null);
    readonly userRoles = computed(() => this.currentUser()?.roles || []);


    constructor() {

    }

    private getLoggedUsers(): Observable<UserLoggedInProfile[]> {
        /*return this.http.get<UserLoggedInProfile[]>(`${this.apiURL}/me`).pipe(
            tap((users) => {
                this.store.dispatch(AuthActions.getLoggedUsersSuccess({ users }));
            })
        );*/
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const user: UserLoggedInProfile = JSON.parse(savedUser);
            this.currentUser.set(user);
            return of([user]);
        } else {
            return of([]);
        }
    }

    login(email: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiURL}/login`, { email, password });
    }


    register(username: string, email: string, password: string, confirmPassword: string, roles: string): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${this.apiURL}/register`, { username, email, password, confirmPassword, roles });
    }

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    setCurrentUser(user: UserLoggedInProfile): void {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);
    }
    removeCurrentUser(): void {
        localStorage.removeItem('user');
        this.currentUser.set(null);
    }
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    removeToken(): void {
        localStorage.removeItem('token');
    }

    logout(): void {
        this.removeToken();
        this.removeCurrentUser();
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['/login']);
    }

}
