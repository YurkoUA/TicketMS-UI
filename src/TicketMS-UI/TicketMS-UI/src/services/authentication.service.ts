import { Injectable } from '@angular/core';
import { User } from '../models/domain/user';
import { TokenService } from '../util-services/token.service';
import { SignInResponse } from '../models/signin-response.model';
import { HeadersManagerService } from '../util-services/headers-manager.service';
import { AccountService } from './api-services/account.service';
import { AccessToken } from '../models/access-token.model';

const AUTHORIZATION = 'Authorization';

@Injectable()
export class AuthenticationService {
    private currentUser: User = new User();

    constructor(private tokenService: TokenService,
        private headersService: HeadersManagerService,
        private accountService: AccountService) {
    }

    isAuthenticated(): boolean {
        return this.currentUser != null && this.currentUser.Id > 0;
    }

    getUser(): User {
        return this.currentUser;
    }

    initializeAuthentication(): void {
        let token: AccessToken = this.tokenService.initializeToken();

        if (token == undefined)
            return;

        this.setAuthorizationHeader(token.Token);

        this.accountService.getAccount()
            .subscribe(u => {
                this.currentUser = u;
            });
    }

    authenticate(model: SignInResponse): void {
        this.currentUser = model.User;
        this.tokenService.setToken(model.Token);
        this.setAuthorizationHeader(model.Token.Token);
    }

    resetAuthentication(): void {
        this.currentUser = null;
        this.tokenService.resetToken();
        this.headersService.deleteHeader(AUTHORIZATION);
    }

    setAuthorizationHeader(token: string): void {
        this.headersService.addHeader(AUTHORIZATION, `Bearer ${token}`);
    }
}
