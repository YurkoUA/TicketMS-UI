import { NgModule } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AccountService } from './api-services/account.service';

@NgModule({
    providers: [
        AccountService,
        AuthenticationService
    ]
})
export class ServicesModule {
}
