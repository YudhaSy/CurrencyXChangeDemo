import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {LocalStorageService} from '../services/local-storage.service';
import {GlobalVariables} from '../constants/globals';
import {map} from 'rxjs/operators';

@Injectable()
export class CxcInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.endsWith('/currencies') || httpRequest.url.endsWith('/rates')) {
      return this.handleCurrencyRequests(httpRequest, next);
    }
    return next.handle(httpRequest);
  }

  private handleCurrencyRequests(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpResponse<any>> {
    const requestKey = httpRequest.url.indexOf(GlobalVariables.CURRENCIES_RESOURCE) > -1 ? GlobalVariables.CURRENCIES_STORAGE_KEY :
      httpRequest.urlWithParams.split('?')[1];
    const storageData = this.localStorageService.getData(requestKey);

    if (storageData === null) {
      return next.handle(httpRequest).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.localStorageService.setData(requestKey, event.body);
            return event.clone(event);
          }
        })
      );
    }
    return of(new HttpResponse({ status: 200, body: storageData }));
  }
}
