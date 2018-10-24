import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { UserProfileComponent } from './user-profile/user-profile.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CalidadLayoutComponent } from './layouts/calidad-layout/calidad-layout.component';
import { RhInternoLayoutComponent } from './layouts/rhInterno-layout/rhInterno-layout.component';
import { ProjectManagerComponent } from './layouts/projectManager-layout/projectManager-layout.component';


import { DataTablesModule } from 'angular-datatables';

import { HttpClientModule }    from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DataService } from "./data.service";
import { AppGuard } from './app.guard';

import { MatProgressBarModule } from '@angular/material';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    DataTablesModule,
    MatProgressBarModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    
     
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CalidadLayoutComponent,
    RhInternoLayoutComponent,
    ProjectManagerComponent,
    LoginComponent,
    UserProfileComponent
  ],
  providers: [DataService,
  AppGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
