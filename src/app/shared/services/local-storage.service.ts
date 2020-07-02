import { Injectable } from '@angular/core';
import {LocalStorage} from '../model/localStorage.model';
import { startOfDay } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getData(dataKey: string) {
    const startOfTheDayMs = startOfDay(new Date()).getTime();

    const value: LocalStorage = JSON.parse(localStorage.getItem(dataKey));
    // return null when no data or when data is older than 24hrs remove from localstorage and return null
    if (value === null || startOfTheDayMs > value.dateTimeMs) {
      localStorage.removeItem(dataKey);
      return null;
    }

    return value.data;
  }

  setData(dataKey: string, data) {
    localStorage.setItem(dataKey, JSON.stringify({dateTimeMs: new Date().getTime(), data}));
  }
}
