// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleModule } from './material-module/material-module.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StaffRegistrationComponent } from './registration/staff-registration/staff-registration.component';
import { HodRegistrationComponent } from './registration/hod-registration/hod-registration.component';
import { HttpHandlerService } from './shared/service/login-http-handler.service';
import { HttpClientModule } from '@angular/common/http';
import { HodDashboardComponent } from './hod-dashboard/hod-dashboard.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { LeaveApplicationFormComponent } from './leave-application-form/leave-application-form.component';
import { LeaveService } from './shared/service/leave-application-form.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    HodRegistrationComponent,
    StaffRegistrationComponent,
    LoginComponent,
    HodDashboardComponent,
    StaffDashboardComponent,
    LeaveApplicationFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleModule,
    HttpClientModule
  ],
  providers: [
    HttpHandlerService,
    LeaveService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
