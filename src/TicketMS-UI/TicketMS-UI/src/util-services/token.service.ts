import { Injectable } from '@angular/core';
import { InternalStorageService } from './internal-storage.service';
import { AccessToken } from '../models/access-token.model';

const ACCESS_TOKEN = 'AccessToken';
const EXPIRES_DATE = 'ExpiresDate';

@Injectable()
export class TokenService {
    private token: AccessToken = new AccessToken();

    constructor(private storageService: InternalStorageService) {
    }

    initializeToken(): AccessToken {
        let token: string = this.storageService.getItem(ACCESS_TOKEN);
        let expires: Date = new Date(this.storageService.getItem(EXPIRES_DATE));

        if (token == undefined || expires == undefined)
            return undefined;

        this.token.Token = token;
        this.token.ExpiresDate = expires;

        return this.token;
    }

    setToken(token: AccessToken): void {
        this.token = token;

        this.storageService.setItem(ACCESS_TOKEN, token.Token);
        // TODO: Convert to unix utc.
        this.storageService.setItem(EXPIRES_DATE, token.ExpiresDate.toString());
    }

    resetToken(): void {
        this.storageService.deleteItem(ACCESS_TOKEN);
        this.storageService.deleteItem(EXPIRES_DATE);
        this.token = null;
    }
}
