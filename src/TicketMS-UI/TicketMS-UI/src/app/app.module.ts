import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './pages/sign-in/sign-in-page.component';
import { AuthPanelComponent } from './components/auth-panel/auth-panel.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { DataTablesModule } from 'angular-datatables';
import { NgbModalModule, NgbPaginationModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { ServicesModule } from '../services/services.module';
import { UtilServicesModule } from '../util-services/util-services.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SeriesListPageComponent } from './pages/serial/series-list/series-list-page.component';
import { ColorsListPageComponent } from './pages/color/colors-list/colors-list-page.component';
import { ColorDetailsModalComponent } from './pages/color/color-details/color-details-modal.component';
import { SerialDetailsModalComponent } from './pages/serial/serial-details/serial-details-modal.component';
import { SerialEditComponent } from './components/serial-edit/serial-edit.component';
import { SerialCreateModalComponent } from './pages/serial/serial-create/serial-create-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { PackagesListModalComponent } from './pages/package/packages-list/packages-list-modal.component';
import { ColorEditComponent } from './components/color-edit/color-edit.component';
import { ColorCreateModalComponent } from './pages/color/color-create/color-create-modal.component';
import { PackagesMainPageComponent } from './pages/package/packages-main-page/packages-main-page.component';
import { PackagesListTabComponent } from './components/packages-list-tab/packages-list-tab.component';
import { PackageDetailsModalComponent } from './pages/package/package-details/package-details-modal.component';
import { SelectListComponent } from './components/select-list/select-list.component';
import { PackageEditComponent } from './components/package-edit/package-edit.component';
import { PackageSpecialEditComponent } from './components/package-special-edit/package-special-edit.component';
import { PackageCreateModalComponent } from './pages/package/package-create/package-create-modal.component';
import { ControlsModule } from '../controls/controls.module';
import { TicketsListSmModalComponent } from './pages/ticket/tickets-list-sm/tickets-list-sm-modal.component';
import { PackageSearchModalComponent } from './pages/package/package-search/package-search-modal.component';
import { TicketsListPageComponent } from './pages/ticket/tickets-list/tickets-list-page.component';
import { TicketDetailsModalComponent } from './pages/ticket/ticket-details/ticket-details-modal.component';
import { TicketCreatePageComponent } from './pages/ticket/ticket-create/ticket-create-page.component';

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
        SignInPageComponent,

        SeriesListPageComponent,
        SerialDetailsModalComponent,
        SerialCreateModalComponent,
        SerialEditComponent,

        ColorsListPageComponent,
        ColorDetailsModalComponent,
        ColorEditComponent,
        ColorCreateModalComponent,

        PackagesListModalComponent,
        PackagesMainPageComponent,
        PackagesListTabComponent,
        PackageDetailsModalComponent,

        AuthPanelComponent,
        ConfirmModalComponent,
        SelectListComponent,
        PackageEditComponent,
        PackageSpecialEditComponent,
        PackageCreateModalComponent,
        TicketsListSmModalComponent,
        PackageSearchModalComponent,
        TicketsListPageComponent,
        TicketDetailsModalComponent,
        TicketCreatePageComponent
    ],
    imports: [
        CoreModule,
        ServicesModule,
        UtilServicesModule,
        ControlsModule,

        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,

        ToastrModule.forRoot(),

        NgbModalModule,
        NgbPaginationModule,
        NgbTabsetModule
        //DataTablesModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        SerialDetailsModalComponent,
        SerialCreateModalComponent,

        ColorDetailsModalComponent,
        ColorCreateModalComponent,

        PackagesListModalComponent,
        PackageDetailsModalComponent,
        PackageCreateModalComponent,
        PackageSearchModalComponent,

        ConfirmModalComponent,

        TicketsListSmModalComponent,

        TicketDetailsModalComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
