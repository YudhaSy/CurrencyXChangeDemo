import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams} from '@angular/common/http';
import {Currency} from '../model/currency.model';
import {Observable} from 'rxjs';
import {GlobalVariables} from '../constants/globals';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * I am doing the extra mile in this service to ensure that the only thing that needs to change is one line change to do a demo,
 * this way a demo user can just clone the project and run this app locally (default localhost:4200)
 * without having to have the aws credentials.
 */
export class CurrencyService {
  // only change CXC_API variable when calling mocked or real data end point for demo purposes
  private CXC_API = 'https://mocked.amazonaws.com/cxc';
  private stubOnly = this.CXC_API.indexOf('mocked') > -1;

  private stubCurrenciesUrl = 'http://localhost:4200/assets/mock-data/currencyList.json';
  private stubConversionUrl = 'http://localhost:4200/assets/mock-data/conversionMock.json';
  private getCurrenciesUrl = this.stubOnly ? this.stubCurrenciesUrl : this.CXC_API + GlobalVariables.CURRENCIES_RESOURCE;
  private getRateUrl = this.stubOnly ? this.stubConversionUrl : this.CXC_API + GlobalVariables.RATES_RESOURCE;

  constructor(private httpClient: HttpClient) {}

  getCurrencies(): Observable<Currency[]> {
    return this.httpClient.get<Currency[]>(this.getCurrenciesUrl);
  }

  getRate(currencyFrom, currencyTo, date) {
    let params = new HttpParams();
    params = params.append('currency_code_from', currencyFrom);
    params = params.append('currency_code_to', currencyTo);
    params = params.append('date', date);

    // extra code by mapping and massaging result for demo purposes,
    // returning the response should be enough in the actual app.
    return this.httpClient.get(this.getRateUrl, {params}).pipe(
      map((event: HttpEvent<any>) => {
        if (!this.stubOnly) {
          return event;
        }

        // static value return from mock data, data will not be accurate when currencies are flipped
        return [
          {currency_code: currencyFrom, value: event[0].value, date},
          {currency_code: currencyTo, value: event[1].value, date}
          ];
      })
    );
  }
}
