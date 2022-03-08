import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Money } from '../money';
import { MoneyService } from '../money.service';
import { Category, TransactionType } from '../transaction';
import * as _ from 'lodash';
import { CalendarService } from '../calendar.service';
@Component({
  selector: 'app-edittransaction',
  templateUrl: './edittransaction.component.html',
  styleUrls: ['./edittransaction.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class EditTransactionComponent implements OnInit {
  title?: string = '';
  type: TransactionType = 'outcome';
  date!: Date;
  amount!: number;
  categoryIncome: Category = 'salary';
  categoryOutcome: Category = 'food';
  category: Category = this.categoryOutcome;

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
    private calendarService: CalendarService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.moneyService.getMoney();
    this.calendarService.getEventsFromTransactions();
  }

  money: Money = this.moneyService.getMoney();

  getMoney(): void {
    this.money = this.moneyService.getMoney();
  }

  clearAllTransactions() {
    this.confirmationService.confirm({
      message: 'Thao tác này sẽ xoá toàn bộ dữ liệu, bạn có chắc với điều đó?',
      accept: () => {
        this.moneyService.clearLocal();
        this.getMoney();
      },
    });
  }

  addTransaction(): void {
    if (this.type === 'income') {
      this.category = this.categoryIncome;
    } else {
      this.category = this.categoryOutcome;
    }
    let newTransaction = {
      date: this.date,
      title: this.title,
      type: this.type,
      category: this.category,
      amount: this.amount,
    };
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Đã thêm khoản chi tiêu này',
    });
    this.moneyService.addTransaction(newTransaction);
    this.getMoney();
  }
}
