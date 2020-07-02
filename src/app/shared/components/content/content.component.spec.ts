import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import {CurrencyService} from '../../services/currency.service';
import {of} from 'rxjs';
import {SelectComponent} from '../select/select.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {TranslateModule} from '@ngx-translate/core';
import {NO_ERRORS_SCHEMA} from '@angular/core';

const mockCurrencyService = {
  getCurrencies() {
    return of();
  },
  showModal() {
  },
  getRate() {
    return of();
  }
};

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContentComponent,
        SelectComponent
      ],
      imports: [
        NgSelectModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: CurrencyService, useValue: mockCurrencyService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should swap the from and to list and their models', () => {
    const fromDataList = [{name: 'abc', key: 'abc'}];
    const toDataList = [{name: 'cde', key: 'cde'}];

    component.fromData = [...fromDataList];
    component.fromSelectedName = component.fromData[0];
    component.toData = [...toDataList];
    component.toSelectedName = component.toData[0];

    component.swapData();

    expect(component.fromData).toEqual(toDataList);
    expect(component.fromSelectedName).toEqual(toDataList[0]);
    expect(component.toData).toEqual(fromDataList);
    expect(component.toSelectedName).toEqual(fromDataList[0]);
  });

  it('should set both from and to currency codes', () => {
    component.fromSelectedName = 'Canadian Dollar';
    component.toSelectedName = 'United States Dollar';
    const dataList = [{code: 'CAD', name: 'Canadian Dollar'},
      {code: 'USD', name: 'United States Dollar'}];
    component.toData = [...dataList];
    component.fromData = [...dataList];
    component.fromCurrencyCode = null;
    component.toCurrencyCode = null;

    component.convert();
    expect(component.fromCurrencyCode).toEqual('CAD');
    expect(component.toCurrencyCode).toEqual('USD');
  });

  it('should return error when no data returned', () => {
    spyOn(component, 'buildResultStrings').and.callFake(() => {});

    component.calculateResult([]);
    expect(component.error).toBeTrue();
  });

  it('should calculate the return data', () => {
    spyOn(component, 'buildResultStrings').and.callFake(() => {});
    const incomingResult = [
      {
        currency_code: 'CAD',
        value: 1.5237489398,
        date: '1999-1-5'
      },
      {
        currency_code: 'AUD',
        value: 1.6067854114,
        date: '1999-1-5'
      }
    ];
    component.fromCurrencyCode = 'CAD';
    component.toCurrencyCode = 'AUD';

    component.calculateResult(incomingResult);

    expect(component.fromCurrencyValue).toBe(1.5237489398);
    expect(component.toCurrencyValue).toBe(1.6067854114);
    expect(component.buildResultStrings).toHaveBeenCalled();
    expect(component.result).toBeTrue();
    expect(component.calculatedData).toBe('1.05');
  });

  it('should disable the convert button', () => {
    component.fromSelectedName = undefined;
    expect(component.isDisabled()).toBeTrue();

    component.fromSelectedName = 'abc';
    component.toSelectedName = undefined;
    expect(component.isDisabled()).toBeTrue();

    component.toSelectedName = 'abc';
    expect(component.isDisabled()).toBeTrue();

    component.amount = null;
    expect(component.isDisabled()).toBeTrue();
  });

  it('should return the correct date string ex: (2020-10-19', () => {
    component.dateVal = new Date(2020, 2, 10);

    const dateString = component.getDateString();
    expect(dateString).toBe('2020-3-10');
  });
});
