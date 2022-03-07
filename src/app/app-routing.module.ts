import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTransactionComponent } from './edittransaction/edittransaction.component';
import { InsightComponent } from './insight/insight.component';

const routes: Routes = [
  { path: '', component: EditTransactionComponent },
  { path: 'transaction', component: EditTransactionComponent },
  { path: 'insight', component: InsightComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
