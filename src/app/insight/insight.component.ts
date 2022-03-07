import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-insight',
  templateUrl: './insight.component.html',
  styleUrls: ['./insight.component.scss'],
})
export class InsightComponent implements OnInit {
  incomeData = this.chartService.getIncomeAmount();
  outcomeData = this.chartService.getOutcomeAmount();

  constructor(private chartService: ChartService) {}

  ngOnInit() {
    this.incomeData = this.chartService.getIncomeAmount();
    this.outcomeData = this.chartService.getOutcomeAmount();
  }
}
