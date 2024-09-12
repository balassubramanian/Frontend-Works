import { Component } from '@angular/core';
import {FormsModule, FormControl, FormControlDirective, FormControlName} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockService } from '../stock.service';
import { SharedService } from '../shared.service';
import { StockChartComponent } from '../stock-chart/stock-chart.component';
@Component({
  selector: 'app-stock-selector',
  standalone: true,
  imports: [FormsModule, CommonModule, StockChartComponent],
  templateUrl: './stock-selector.component.html',
  styleUrls: ['./stock-selector.component.css']
})
export class StockSelectorComponent {
   firstNameControl = "";
   stockData: any;
   stockEntries: Array<{ date: string, data: any }> = [];
   constructor(private stockService: StockService, private sharedService: SharedService) {}



   fetchStockData() {

    this.sharedService.store(this.firstNameControl);
    var q = this.sharedService.getval();
    console.log("this is in selecor", q);  
    this.stockService.fetchStockData(this.firstNameControl).subscribe(
      (data: any) => {
        this.stockData = data;

        // Extract the time series data
        const timeSeries = data['Time Series (Daily)'];
        if (timeSeries) {
          this.stockEntries = Object.keys(timeSeries).map((date) => ({
            date,
            data: timeSeries[date],
          }));
        }
      },
      (error) => {
        console.error('Error fetching stock data', error);
      }
    );
  }
  displayChart(){
    this.sharedService.triggerButtonClick();
  }

}
