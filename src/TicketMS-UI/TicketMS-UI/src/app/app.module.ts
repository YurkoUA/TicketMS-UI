import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './pages/sign-in/sign-in-page.component';
import { AuthPanelComponent } from './components/auth-panel/auth-panel.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { DataTablesModule } from 'angular-datatables';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
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

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
        SignInPageComponent,

        SeriesListPageComponent,
        SerialDetailsModalComponent,
        SerialCreateModalComponent,

        ColorsListPageComponent,
        ColorDetailsModalComponent,

        PackagesListModalComponent,

        AuthPanelComponent,
        ConfirmModalComponent,

        SerialEditComponent,

        ColorEditComponent,

        ColorCreateModalComponent
    ],
    imports: [
        CoreModule,
        ServicesModule,
        UtilServicesModule,

        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,

        NgbModalModule,
        ToastrModule.forRoot()
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

        ConfirmModalComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
