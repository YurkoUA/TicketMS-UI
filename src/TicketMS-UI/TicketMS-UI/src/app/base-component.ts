import { AuthenticationService } from "../services/authentication.service";

export abstract class BaseComponent {
    constructor(protected authenticationService: AuthenticationService) {
    }

    get isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }

    get userName(): string {
        if (this.isAuthenticated) {
            return this.authenticationService.getUser().UserName;
        }
        return null;
    }

    get isAdmin(): boolean {
        if (!this.isAuthenticated)
            return false;

        return this.authenticationService.isAdmin;
    }
}
