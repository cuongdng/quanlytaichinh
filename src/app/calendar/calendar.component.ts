import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendarEvents = this.calendarService.getEventsFromTransactions();

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.calendarEvents,
    fixedWeekCount: false,
    firstDay: 1,
  };

  constructor(private calendarService: CalendarService) {}

  getCalendarEvents(): void {
    this.calendarOptions.events =
      this.calendarService.getEventsFromTransactions();
  }

  ngOnInit(): void {
    this.calendarEvents = this.calendarService.getEventsFromTransactions();
  }
}
