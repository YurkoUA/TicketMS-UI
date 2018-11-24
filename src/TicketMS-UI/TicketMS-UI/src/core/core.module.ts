import { NgModule } from '@angular/core';
import { AuthorizeGuard } from './guards/authorize.guard';
import { AnonymousGuard } from './guards/anonymous.guard';
import { ServicesModule } from '../services/services.module';
import { LogoutGuard } from './guards/log-out.guard';

@NgModule({
    providers: [
        AuthorizeGuard,
        AnonymousGuard,
        LogoutGuard
    ],
    imports: [
        ServicesModule
    ]
})
export class CoreModule {
}
