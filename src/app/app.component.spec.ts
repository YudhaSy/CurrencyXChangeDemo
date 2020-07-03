import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {CurrencyService} from './shared/services/currency.service';
import {of} from 'rxjs';
import {BsModalRef, BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {CUSTOM_ELEMENTS_SCHEMA, Injectable} from '@angular/core';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TranslateModule} from '@ngx-translate/core';

@Injectable()
class StubbedModalService {
  public show(): BsModalRef {
    return {
      hide(): void {
      }, setClass(newClass: string): void {
      }, content: {closeBtnName: ''}};
  }
}

const mockCurrencyService = {
  getCurrencies() {
    return of();
  },
  showModal() {
  }
};

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let showSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AlertModule.forRoot(),
        RouterTestingModule,
        ModalModule.forRoot(),
        NgxSpinnerModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: BsModalService, useClass: StubbedModalService},
        {provide: CurrencyService, useValue: mockCurrencyService}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    const stubbedModalService = fixture.debugElement.injector.get(BsModalService);
    showSpy = spyOn(stubbedModalService, 'show');
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
