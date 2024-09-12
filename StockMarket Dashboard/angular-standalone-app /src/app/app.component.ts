import { Component } from '@angular/core';
import { MainComponent } from './main/main.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { StockSelectorComponent } from './stock-selector/stock-selector.component';
@Component({
  selector: 'app-root',
  imports: [MainComponent,StockChartComponent, StockSelectorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-standalone-app';
}
