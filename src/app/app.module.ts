import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CurrencyService} from './shared/services/currency.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';
import { ContentComponent } from './shared/components/content/content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SelectComponent } from './shared/components/select/select.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {CxcInterceptor} from './shared/interceptor/cxc-interceptor';
import {AlertModule} from 'ngx-bootstrap/alert';
import {ModalModule} from 'ngx-bootstrap/modal';
import { PrivacyTermsModalComponent } from './shared/components/footer-modal/privacy-terms-modal.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

export  function  HttpLoaderFactory(http: HttpClient) {
  return  new  TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    SelectComponent,
    PrivacyTermsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgSelectModule,
    NgbModule,
    FormsModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide:  TranslateLoader,
        useFactory:  HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    CurrencyService,
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: CxcInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
