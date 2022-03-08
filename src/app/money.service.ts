import { Injectable } from '@angular/core';
import { Money } from './money';
import { Transaction } from './transaction';
@Injectable({
  providedIn: 'root',
})
export class MoneyService {
  private money: Money = {
    transactions: [],
    total: 0,
  };

  getMoney(): Money {
    this.money = this.getFromLocal();
    return this.money;
  }

  addTransaction(transaction: Transaction) {
    this.money.transactions.push(transaction);
    if (transaction.type === 'income') {
      this.money.total += transaction.amount;
    } else if (transaction.type === 'outcome') {
      this.money.total -= transaction.amount;
    }
    this.saveToLocal();
  }

  clearLocal() {
    localStorage.removeItem('money');
  }

  saveToLocal(): void {
    let myData = JSON.stringify(this.money);
    localStorage.setItem('money', myData);
  }

  getFromLocal(): Money {
    let localData =
      localStorage.getItem('money') ||
      `{"transactions": [],
    "total": 0}`;
    return JSON.parse(localData);
  }
  constructor() {}
}
