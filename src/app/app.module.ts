import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/module/module.module';
import { MainComponentComponent } from './nav/main-component/main-component.component';
import { ToolbarComponent } from './nav/toolbar/toolbar.component';
import { SidenavComponent } from './nav/sidenav/sidenav.component';
import { LoginComponent } from './component/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './component/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UserDataService } from './shared/user-data.service';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AccountInfoComponent } from './component/account-info/account-info.component';
import { AccountInfoTabComponent } from './component/account-info/account-info-tab.component';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    ToolbarComponent,
    SidenavComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AccountInfoComponent,
    AccountInfoTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      UserDataService, { dataEncapsulation: false },
    ),
    ToastrModule.forRoot({ positionClass: 'inline' }),
    ToastContainerModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
