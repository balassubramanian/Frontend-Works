import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  
  constructor(private http: HttpClient) {}

  fetchStockData(symbol: string): Observable<any> {
    if (symbol.toUpperCase() === 'IBM') {
      // Fetch data from local JSON file
      return this.http.get('/assets/ibm-stock-data.json');
    }
    else {
    const apiKey = 'RL142YJ5HD43MQOO';
    var apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    return this.http.get(apiUrl);
    }
  }
}
