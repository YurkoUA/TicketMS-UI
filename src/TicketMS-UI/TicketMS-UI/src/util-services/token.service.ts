import { Injectable } from '@angular/core';
import { InternalStorageService } from './internal-storage.service';

@Injectable()
export class TokenService {
    constructor(private storageService: InternalStorageService) {

    }

    setToken(token: string): void {
        this.storageService.setItem('AccessToken', token);
    }

    resetToken(): void {
        this.storageService.deleteItem('AccessToken');
    }
}
