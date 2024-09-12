import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../stock.service';
import { SharedService } from '../shared.service';
import { StockChartComponent } from '../stock-chart/stock-chart.component';
import { StockSelectorComponent } from '../stock-selector/stock-selector.component';
@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styles: [],
  imports: [CommonModule,StockChartComponent, StockSelectorComponent], 
})
export class MainComponent implements OnInit {
  stockData: any;
  stockEntries: Array<{ date: string, data: any }> = [];

  constructor(private stockService: StockService,private sharedService: SharedService) {}
  
  ngOnInit() {}

  
}
