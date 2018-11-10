import { Injectable } from '@angular/core';
import { User } from '../models/domain/user';
import { TokenService } from '../util-services/token.service';
import { SignInResponse } from '../models/signin-response.model';

@Injectable()
export class AuthenticationService {
    private currentUser: User;

    constructor(private tokenService: TokenService) {

    }

    isAuthenticated(): boolean {
        return this.currentUser != null;
    }

    authenticate(model: SignInResponse): void {
        this.currentUser = model.User;
    }

    resetAuthentication(): void {
        this.currentUser = null;
        this.tokenService.resetToken();
    }
}
