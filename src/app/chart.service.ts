import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { MoneyService } from './money.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  DEFAULT_COLORS = [
    '#3366CC',
    '#DC3912',
    '#FF9900',
    '#109618',
    '#990099',
    '#3B3EAC',
    '#0099C6',
    '#DD4477',
    '#66AA00',
    '#B82E2E',
    '#316395',
    '#994499',
    '#22AA99',
    '#AAAA11',
    '#6633CC',
    '#E67300',
    '#8B0707',
    '#329262',
    '#5574A6',
    '#3B3EAC',
  ];

  private configureDefaultColours(data: number[]): string[] {
    let customColours: any = [];
    if (data.length) {
      customColours = data.map((element, idx) => {
        return this.DEFAULT_COLORS[idx % this.DEFAULT_COLORS.length];
      });
    }

    return customColours;
  }

  getIncomeAmount() {
    let transactionsData = this.moneyService.getFromLocal().transactions;
    let groupByType = _.groupBy(transactionsData, (value) => {
      return value.type;
    });

    let incomeChartData = _.groupBy(groupByType['income'], (value) => {
      return value.category;
    });

    let incomeChartFinalRawData = _.mapValues(incomeChartData, (value) => {
      return _.sumBy(value, (childValue) => {
        return childValue.amount;
      });
    });

    let incomeCurrentLabels = Object.keys(incomeChartFinalRawData);
    let incomeCurrentData = _.map(incomeChartFinalRawData, (value) => value);
    let incomeCurrentColor = this.configureDefaultColours(incomeCurrentData);

    let incomeChartFinalData = {
      labels: incomeCurrentLabels,
      datasets: [
        {
          data: incomeCurrentData,
          backgroundColor: incomeCurrentColor,
        },
      ],
    };

    return incomeChartFinalData;
  }

  getOutcomeAmount() {
    let transactionsData = this.moneyService.getFromLocal().transactions;

    let groupByType = _.groupBy(transactionsData, (value) => {
      return value.type;
    });
    let outcomeChartData = _.groupBy(groupByType['outcome'], (value) => {
      return value.category;
    });

    let outcomeChartFinalRawData = _.mapValues(outcomeChartData, (value) => {
      return _.sumBy(value, (childValue) => {
        return childValue.amount;
      });
    });

    let outcomeCurrentLabels = Object.keys(outcomeChartFinalRawData);
    let outcomeCurrentData = _.map(outcomeChartFinalRawData, (value) => value);
    let outcomeCurrentColor = this.configureDefaultColours(outcomeCurrentData);

    let outcomeChartFinalData = {
      labels: outcomeCurrentLabels,
      datasets: [
        {
          data: outcomeCurrentData,
          backgroundColor: outcomeCurrentColor,
        },
      ],
    };
    return outcomeChartFinalData;
  }
  constructor(private moneyService: MoneyService) {}
}
