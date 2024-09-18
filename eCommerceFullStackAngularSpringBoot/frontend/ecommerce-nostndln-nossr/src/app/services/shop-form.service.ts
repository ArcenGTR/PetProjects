import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    for (let m = startMonth; m <= 12; m++) {
      data.push(m);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    
    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let y = startYear; y <= endYear; y++) {
      data.push(y);
    }

    return of(data);
  }
}
