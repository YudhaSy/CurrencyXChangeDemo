import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CurrencyServiceService', () => {
  let service: CurrencyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CurrencyService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
