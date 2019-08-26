import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BaseChartDirective} from 'ng2-charts-x';
import {ChartDataSets} from 'chart.js';

interface SoldPriceModel {
  '0% - 5%': SoldPriceModelItem[];
  '5% - 25%': SoldPriceModelItem[];
  '25% - 75%': SoldPriceModelItem[];
  '75% - 95%': SoldPriceModelItem[];
  '95% - 100%': SoldPriceModelItem[];
}

interface SoldPriceModelItem {
  x: number;
  y: number;
  p: number;
}

enum SoldPriceColors {
  '0% - 5%' = 'navy',
  '5% - 25%' = 'blue',
  '25% - 75%' = 'green',
  '75% - 95%' = 'yellow',
  '95% - 100%' = 'red'
}

@Component({
  selector: 'app-sold-price',
  templateUrl: './sold-price.component.html',
  styleUrls: ['./sold-price.component.sass']
})

export class SoldPriceComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public soldPriceChartData: ChartDataSets[] = [
    {
      data: [],
      label: ''
    }
  ];

  public soldPriceChartLabels = [];

  public soldPriceChartColors = [];

  private updateChart() {
    this.chart.ngOnChanges({});
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getSoldPriceData().subscribe((soldPriceData: SoldPriceModel) => {
      this.drawSoldPriceScatterChart(soldPriceData);
    });
  }

  private drawSoldPriceScatterChart(soldPriceData: SoldPriceModel) {
    this.soldPriceChartData.pop();
    for (const soldPriceDataGroup in soldPriceData) {
      if (soldPriceData.hasOwnProperty(soldPriceDataGroup)) {
        this.soldPriceChartLabels.push(soldPriceDataGroup);
        this.soldPriceChartData.push(
          {
            data: Object.keys(soldPriceData[soldPriceDataGroup]).map((key) => {
              return soldPriceData[soldPriceDataGroup][key];
            }),
            label: soldPriceDataGroup,
            backgroundColor: SoldPriceColors[soldPriceDataGroup],
            borderColor: SoldPriceColors[soldPriceDataGroup]
          }
        );
      }
    }
    this.updateChart();
  }

  private getSoldPriceData() {
    return this.http.get<SoldPriceModel>(`${environment.apiUrlBase}/api/sold-price`);
  }

}
