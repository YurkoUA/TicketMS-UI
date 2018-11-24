import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
    selector: 'app-auth-panel',
    templateUrl: './auth-panel.component.html'
})
export class AuthPanelComponent {
    constructor(private authService: AuthenticationService) {

    }

    get isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }

    get userName(): string {
        if (this.isAuthenticated)
            return this.authService.getUser().UserName;

        return '';
    }

    signOut(): void {
        if (confirm('Are you sure?') === true)
            this.authService.resetAuthentication();
    }
}
