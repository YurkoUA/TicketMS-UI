import { Component, ViewChild } from '@angular/core';
import { AccountService } from '../../../services/api-services/account.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { SignInRequest } from '../../../models/signin-request.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in-page.component.html'
})
export class SignInPageComponent {
    model: SignInRequest = new SignInRequest();

    @ViewChild('signInForm') signInForm: NgForm;

    constructor(private accountService: AccountService,
        private authService: AuthenticationService,
        private router: Router) {

    }

    signIn(): void {
        if (!this.signInForm.valid)
            return;

        this.accountService.signIn(this.model)
            .subscribe(resp => {
                this.authService.authenticate(resp);
                this.router.navigate(['/']);
            });
    }
}
