import { computed, Service, signal } from '@angular/core';

@Service()
export class LoadingService {
    private activeRequests = signal<number>(0);

    isLoading = computed(() => this.activeRequests() > 0);
    
    show() {
        this.activeRequests.update((count) => count + 1);
    }

    hide() {
        this.activeRequests.update(count => Math.max(0, count - 1));
    }
}
