import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FilterService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditTransactionComponent } from './edittransaction/edittransaction.component';
import { FormsModule } from '@angular/forms';
import { InsightComponent } from './insight/insight.component';
import { CalendarComponent } from './calendar/calendar.component';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    EditTransactionComponent,
    InsightComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    ButtonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    RadioButtonModule,
    ListboxModule,
    CalendarModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    TableModule,
    ChartModule,
    DividerModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, FilterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
