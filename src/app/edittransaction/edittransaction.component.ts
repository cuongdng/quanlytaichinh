import { Component, OnInit } from '@angular/core';
import { Money } from '../money';
import { MoneyService } from '../money.service';
import { Category, TransactionType } from '../transaction';
import * as _ from 'lodash';
import { CalendarService } from '../calendar.service';
@Component({
  selector: 'app-edittransaction',
  templateUrl: './edittransaction.component.html',
  styleUrls: ['./edittransaction.component.scss'],
})
export class EditTransactionComponent implements OnInit {
  title?: string = '';
  type: TransactionType = 'outcome';
  date!: Date;
  amount!: number;
  category: Category = 'food';

  outcomeCategory = [
    { label: 'Ăn uống', value: 'food' },
    { label: 'Quần áo', value: 'clothes' },
    { label: 'Phí dịch vụ', value: 'fee' },
    { label: 'Mua sắm', value: 'shopping' },
    { label: 'Vay nợ', value: 'dept' },
    { label: 'Di chuyển', value: 'transportation' },
  ];

  incomeCategory = [
    { label: 'Tiền lương', value: 'salary' },
    { label: 'Tiền thưởng', value: 'bonus' },
    { label: 'Vay nợ', value: 'dept' },
    { label: 'Được tặng', value: 'gift' },
  ];

  constructor(
    private moneyService: MoneyService,
    private calendarService: CalendarService
  ) {}

  ngOnInit() {
    this.moneyService.getMoney();
    this.calendarService.getEventsFromTransactions();
  }

  money: Money = this.moneyService.getMoney();

  getMoney(): void {
    this.money = this.moneyService.getMoney();
  }

  addTransaction(): void {
    let newTransaction = {
      date: this.date,
      title: this.title,
      type: this.type,
      category: this.category,
      amount: this.amount,
    };
    this.moneyService.addTransaction(newTransaction);
    this.getMoney();
  }
}
