import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './pages/sign-in/sign-in-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AnonymousGuard } from '../core/guards/anonymous.guard';
import { CoreModule } from '../core/core.module';
import { AuthorizeGuard } from '../core/guards/authorize.guard';
import { LogoutGuard } from '../core/guards/log-out.guard';
import { SeriesListPageComponent } from './pages/serial/series-list/series-list-page.component';
import { ColorsListPageComponent } from './pages/color/colors-list/colors-list-page.component';
import { PackagesMainPageComponent } from './pages/package/packages-main-page/packages-main-page.component';
import { TicketsListPageComponent } from './pages/ticket/tickets-list/tickets-list-page.component';
import { TicketCreatePageComponent } from './pages/ticket/ticket-create/ticket-create-page.component';

const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'sign-in', component: SignInPageComponent, canActivate: [AnonymousGuard] },
    { path: 'log-out', component: MainPageComponent, canActivate: [AuthorizeGuard, LogoutGuard] },

    { path: 'serial', component: SeriesListPageComponent },
    { path: 'serial/:id', component: SeriesListPageComponent },

    { path: 'color', component: ColorsListPageComponent },
    { path: 'color/:id', component: ColorsListPageComponent },

    { path: 'package', component: PackagesMainPageComponent },
    { path: 'package/:id', component: PackagesMainPageComponent },

    { path: 'ticket', component: TicketsListPageComponent },
    { path: 'ticket/:type', component: TicketsListPageComponent },
    { path: 'ticket-create', component: TicketCreatePageComponent },

    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
