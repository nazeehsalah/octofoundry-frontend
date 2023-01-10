import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from '@theme/theme.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from './@core/interceptors/error-interceptor.service';
import { LoaderInterceptorProvider } from './@core/interceptors/loader.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ThemeModule,
  ],
  providers: [LoaderInterceptorProvider, ErrorInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
