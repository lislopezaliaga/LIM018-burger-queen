import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewAdminComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
