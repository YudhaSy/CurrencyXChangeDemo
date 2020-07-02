import {Component, OnInit} from '@angular/core';
import {CurrencyService} from './shared/services/currency.service';
import {Currency} from './shared/model/currency.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PrivacyTermsModalComponent} from './shared/components/footer-modal/privacy-terms-modal.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  privacyPolicyModalTitle = 'Privacy Policy for CurrencyXChange';
  termsOfConditionsModalTitle = 'Terms and Conditions';
  data: Currency[] = [];
  bsModalRef: BsModalRef;
  privacyTermsAlert = 'privacyTerms';
  featureAlert = 'upcomingFeatureAlert';
  currentAlert = this.privacyTermsAlert;

  constructor(private currencyService: CurrencyService,
              private modalService: BsModalService,
              private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
    this.translateService.use(this.translateService.getBrowserLang());
    this.getCurrenciesList();
  }

  getCurrenciesList() {
    this.currencyService.getCurrencies().subscribe(data => {
      this.data = data;
    });
  }

  showModal(type) {
    const initialState = {
      title: type === 'privacy' ? this.privacyPolicyModalTitle : this.termsOfConditionsModalTitle,
      dataType: type
    };
    this.bsModalRef = this.modalService.show(PrivacyTermsModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
