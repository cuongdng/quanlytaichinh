import { Injectable } from '@angular/core';
import { MoneyService } from './money.service';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  getEventsFromTransactions() {
    let transactionsData = this.moneyService.getFromLocal().transactions;
    let consumptionDay = _.map(
      _.uniqBy(transactionsData, (e) => {
        return e.date;
      }),
      (e) => {
        return e.date;
      }
    ); //The list of day user has use or receive money.

    let calendarEvents = _.map(consumptionDay, (e) => {
      let dateString = e.toString();
      let incomeMoney = _.reduce(
        transactionsData,
        (sum, currentValue) => {
          if (currentValue.date === e && currentValue.type === 'income') {
            return sum + currentValue.amount;
          }
          return sum;
        },
        0
      );

      let outcomeMoney = _.reduce(
        transactionsData,
        (sum, currentValue) => {
          if (currentValue.date === e && currentValue.type === 'outcome') {
            return sum + currentValue.amount;
          }
          return sum;
        },
        0
      );

      return {
        [dateString]: {
          income: incomeMoney,
          outcome: outcomeMoney,
        },
      };
    });

    let result = _.flatMap(calendarEvents, (e) => {
      const outcomeCurrency = e[Object.keys(e)[0]].outcome;
      const incomeCurrency = e[Object.keys(e)[0]].income;
      let vndCurrency = Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });

      if (e[Object.keys(e)[0]].income === 0) {
        return {
          title: '- ' + vndCurrency.format(outcomeCurrency),
          date: Object.keys(e)[0],
          color: 'transparent',
          textColor: 'red',
          allDay: true,
        };
      }
      if (e[Object.keys(e)[0]].outcome === 0) {
        return {
          title: '+ ' + vndCurrency.format(incomeCurrency),
          date: Object.keys(e)[0],
          color: 'transparent',
          textColor: 'green',
          allDay: true,
        };
      }

      return [
        {
          title: '+ ' + vndCurrency.format(incomeCurrency),
          date: Object.keys(e)[0],
          color: 'transparent',
          textColor: 'green',
          allDay: true,
        },

        {
          title: '- ' + vndCurrency.format(outcomeCurrency),
          date: Object.keys(e)[0],
          color: 'transparent',
          textColor: 'red',
          allDay: true,
        },
      ];
    });
    return result;
  }

  // saveToLocal() {
  //   let myData = JSON.stringify(this.events);
  //   console.log(myData);
  //   localStorage.setItem('events', myData);
  // }

  // getFromLocal() {
  //   let localData = localStorage.getItem('events') || `{}`;
  //   return JSON.parse(localData);
  // }

  constructor(private moneyService: MoneyService) {}
}
