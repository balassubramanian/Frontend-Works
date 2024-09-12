import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { StockService } from '../stock.service';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-stock-chart',
  standalone: true,
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent {
  stockData: any;
  stockDataArray: Array<{ date: string, data: any }> = [];
  @ViewChild('chart1', { static: true }) private chartContainer1!: ElementRef;
  @ViewChild('chart2', { static: true }) private chartContainer2!: ElementRef;
  constructor(private stockService: StockService,private sharedService: SharedService) {}
  ngOnInit(): void {
    this.sharedService.buttonClicked$.subscribe(() => {
      this.onButtonClicked();
    });
  }
  onButtonClicked() {
   this.fetchStockData();
  }

  fetchStockData() {
    var stockname = this.sharedService.getval();
    this.stockService.fetchStockData(stockname).subscribe(
      (data: any) => {
        console.log('Stock Data:', data); 
        this.stockData = data;
        const timeSeries = data['Time Series (Daily)'];
        if (timeSeries) {
          this.stockDataArray = Object.keys(timeSeries).map((date) => ({
            date,
            data: timeSeries[date],
          }));
          this.createChart1();
          this.createChart2();
        }
      },
      (error) => {
        console.error('Error fetching stock data', error);
      }
    );
  }
  createChart1(){
    const date = this.stockDataArray.map(item => item.date);
    const open = this.stockDataArray.map(item => item.data['1. open']);
    const high = this.stockDataArray.map(item=> item.data['2. high']);
    const low = this.stockDataArray.map(item=> item.data['3. low']);
    const close = this.stockDataArray.map(item=> item.data['4. close']);
    const volume = this.stockDataArray.map(item=> item.data['5. volume']);
    
    const combined = [...open, ...high, ...low, ...close];
    const containerWidth = this.chartContainer1.nativeElement.getBoundingClientRect().width;
    const width = containerWidth - 60;  
    const height = 500;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 150;
    const marginLeft = 40;

    const svg = d3.select(this.chartContainer1.nativeElement)
    .append('svg')
    .attr('viewBox', `0 0 ${width + marginLeft + marginRight} ${height + marginTop + marginBottom}`)
    .append('g')
    .attr('transform', `translate(${marginLeft},${marginTop})`);
    const parseDate = d3.timeParse('%Y-%m-%d');

    const x = d3.scaleTime()
    .domain(d3.extent(date, d => parseDate(d)) as [Date,Date])
    .range([0,width]);

    const y = d3.scaleLinear()
    .domain([d3.min(combined) as number, d3.max(combined) as number])
    .range([height,0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat((domainValue) => {
        const date = domainValue as Date;
        return d3.timeFormat('%Y-%m-%d')(date);
      }))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('dy', '1.5em')
      .style('text-anchor', 'end');

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + marginBottom - 10)
      .style("text-anchor", "end")
      .text("Date");
        
    svg.append('g')
    .call(d3.axisLeft(y));

    svg.append("text")
  .attr("x", -height / 2)
  .attr("y", -marginLeft + 10)
  .attr("transform", "rotate(-90)")
  .style("text-anchor", "middle")
  .text("Price");

    const line_close = d3.line()
    .x((d,i) => 
    {
      const parsedDate = parseDate(date[i]);
      return parsedDate ? x(parsedDate) as number : 0;
    })
    .y((d,i) => y(close[i]));


    const line_open = d3.line()
    .x((d,i) => 
    {
      const parsedDate = parseDate(date[i]);
      return parsedDate ? x(parsedDate) as number : 0;
    })
    .y((d,i) => y(open[i]));


    const line_high = d3.line()
    .x((d,i) => 
    {
      const parsedDate = parseDate(date[i]);
      return parsedDate ? x(parsedDate) as number : 0;
    })
    .y((d,i) => y(high[i]));


    const line_low = d3.line()
    .x((d,i) => 
    {
      const parsedDate = parseDate(date[i]);
      return parsedDate ? x(parsedDate) as number : 0;
    })
    .y((d,i) => y(low[i]));

    svg.append('path')
    .datum(close)
    .attr('fill','none')
    .attr('stroke','blue')
    .attr('d', line_close)

    svg.append('path')
    .datum(open)
    .attr('fill','none')
    .attr('stroke','yellow')
    .attr('d', line_open)

    svg.append('path')
    .datum(high)
    .attr('fill','none')
    .attr('stroke','red')
    .attr('d', line_high)

    svg.append('path')
    .datum(low)
    .attr('fill','none')
    .attr('stroke','black')
    .attr('d', line_low)

    svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "blue")
    svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "yellow")
    svg.append("circle").attr("cx",200).attr("cy",180).attr("r", 6).style("fill", "red")
    svg.append("circle").attr("cx",200).attr("cy",200).attr("r", 6).style("fill", "black")
    svg.append("text").attr("x", 220).attr("y", 130).text("Close").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 220).attr("y", 160).text("Open").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 220).attr("y", 180).text("High").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 220).attr("y", 200).text("Low").style("font-size", "15px").attr("alignment-baseline","middle")


  }


  createChart2(){
    const volume = this.stockDataArray.map(item=> item.data['5. volume']);
    const date = this.stockDataArray.map(item => item.date);
    const containerWidth = this.chartContainer1.nativeElement.getBoundingClientRect().width;
    const width = containerWidth - 60;  
    const height = 500;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 60;
    const marginLeft = 80;

    
    const barWidth = width / this.stockDataArray.length * 0.8; 
    const xBand = d3.scaleBand()
  .domain(date)
  .range([0, width])
  .padding(0.1);  


    const svg = d3.select(this.chartContainer2.nativeElement)
    .append('svg')
    .attr('viewBox', `0 0 ${width + marginLeft + marginRight} ${height + marginTop + marginBottom}`)
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .append('g')
    .attr('transform', `translate(${marginLeft},${marginRight})`);

    const parseDate = d3.timeParse('%Y-%m-%d');
    const parsedDates = date.map(d => parseDate(d)).filter(d => d !== null) as Date[];

    const x = d3.scaleBand()
    .domain(parsedDates.map(d => d.toString()))  
    .range([0, width])
    .padding(0.2);

    const y = d3.scaleLinear()
    .domain([0, d3.max(volume) as number])
    .range([height, 0]);

    svg.append("g")
    .attr('fill',"blue")
    .selectAll()
    .data(this.stockDataArray)
    .enter().append("rect")
    .attr("x", (d, i) => x(parsedDates[i].toString())!)
    .attr("y", d => y(+d.data['5. volume']))
    .attr("height", d => height - y(+d.data['5. volume']))
    .attr("width", xBand.bandwidth() );

    svg.append("g")
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat((d) => d3.timeFormat('%Y-%m-%d')(new Date(d))))
    .selectAll('text')
    .attr('transform', 'rotate(-65)')  
    .attr('text-anchor', 'end')
    .attr('dx', '-0.8em')
    .attr('dy', '0.15em');

    svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + marginBottom + 15)  
    .style("text-anchor", "middle")
    .text("Date");

    svg.append('g')
    .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format(".2s")));

    svg.append("text")
    .attr("x", -height / 2)
    .attr("y", -marginLeft + 15)
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "middle")
    .text("Volume");

  }
}

