import { AuthenticationService } from "../services/authentication.service";
import { IConfirmOptions } from "../models/interfaces/confirm-options.interface";

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

    confirm(options: IConfirmOptions): void {
        var isSuccess = confirm(options.message);

        if (isSuccess) {
            options.onConfirm();
        } else if (options.onCancel) {
            options.onCancel();
        }
    }
}
