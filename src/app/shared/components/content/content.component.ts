import {Component, Input, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {CurrencyService} from '../../services/currency.service';
import {Currency} from '../../model/currency.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less']
})
export class ContentComponent implements OnInit {
  @Input() set data(value: Currency[]) {
    this.dataList = value;
    this.setDropDownDataLists();
  }

  dataList: Currency[] = [];
  fromData;
  dateVal = new Date();
  minDate = new Date(1999, 0, 4, 0, 0, 0);
  maxDate = new Date();
  toData;
  fromSelectedName;
  toSelectedName;
  amount = 1;
  result = false;
  resultLine1;
  resultLine2;
  resultLine3;
  calculatedData;
  fromCurrencyCode;
  toCurrencyCode;
  fromCurrencyValue;
  toCurrencyValue;
  error = false;

  constructor(private spinnerService: NgxSpinnerService,
              private currencyService: CurrencyService) {}

  ngOnInit(): void {}

  setDropDownDataLists() {
    this.fromData = [...this.dataList];
    this.toData = [...this.dataList];
  }

  swapData() {
    const tmpData = this.fromData;
    this.fromData = [...this.toData];
    this.toData = [...tmpData];
    const tmpModel = this.fromSelectedName;
    this.fromSelectedName = this.toSelectedName;
    this.toSelectedName = tmpModel;
  }

  convert() {
    this.result = false;
    this.error = false;
    this.fromCurrencyCode = this.fromData.find(x => x.name === this.fromSelectedName).code;
    this.toCurrencyCode = this.toData.find(x => x.name === this.toSelectedName).code;
    this.spinnerService.show();
    const date = this.getDateString();

    this.currencyService.getRate(this.fromCurrencyCode, this.toCurrencyCode, date).subscribe(res => {
      this.calculateResult(res);
    });
  }

  calculateResult(result) {
    if (result.length < 2) {
      this.error = true;
      this.spinnerService.hide();
      return;
    }
    result.forEach(data => {
      data.currency_code === this.fromCurrencyCode ? this.fromCurrencyValue = data.value : this.toCurrencyValue = data.value;
    });
    this.calculatedData = ((this.toCurrencyValue / this.fromCurrencyValue) * this.amount);
    this.buildResultStrings();
    this.result = true;
    this.spinnerService.hide();
  }

  buildResultStrings() {
    const fromCurr = this.fromData.find(x => x.name === this.fromSelectedName);
    const toCurr = this.toData.find(x => x.name === this.toSelectedName);
    this.resultLine1 = ' ' + fromCurr.name + ' ' + '(' + fromCurr.code + ')';
    this.resultLine2 = ' ' + toCurr.name + ' ' + '(' + toCurr.code + ')';
    this.resultLine3 = this.getDateString();
  }

  isDisabled() {
    return this.fromSelectedName === undefined ||
      this.toSelectedName === undefined ||
      this.fromSelectedName === this.toSelectedName ||
      this.amount === null;
  }

  getDateString() {
    return this.dateVal.getFullYear().toString() + '-' + Number(this.dateVal.getMonth() + 1).toString() + '-' +
      Number(this.dateVal.getDate()).toString();
  }
}
