
import { MainTableComponent } from './components/main-table/main-table.component';
import { NewContractComponent } from './components/new-contract/new-contract.component';
import { ProcessingTableComponent } from './components/processing-table/processing-table.component';
import { PayTimeTableComponent } from './components/pay-time-table/pay-time-table.component';
import { FinishedTableComponent } from './components/finished-table/finished-table.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/app-main-table', pathMatch: 'full' },
    { path: 'app-main-table', component: MainTableComponent },
    { path: 'new-contract', component: NewContractComponent },
    { path: 'processing-table', component: ProcessingTableComponent },
    { path: 'pay-time-table', component: PayTimeTableComponent },
    { path: 'finished-table', component: FinishedTableComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
