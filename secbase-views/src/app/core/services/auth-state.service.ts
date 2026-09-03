// ./src/app/core/services/auth-state.service.ts

import { computed, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {
    private readonly _isAuthenticated = signal<boolean>(false);

    readonly isAuthenticated = computed(() => this._isAuthenticated());

    setAuthenticated(status: boolean): void {
        this._isAuthenticated.set(status);
    }
}
