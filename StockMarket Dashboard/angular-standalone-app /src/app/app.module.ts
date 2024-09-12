import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { StockSelectorComponent } from './stock-selector/stock-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StockChartComponent,
    StockSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
