import { HomeComponent } from './components/home/home.component';
import { MainTableComponent } from './components/main-table/main-table.component';
import { TableExpandableRowsExample } from './components/tables/tables.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/app-main-table', pathMatch: 'full' },
    { path: 'app-main-table', component: MainTableComponent },
    { path: 'home', component: HomeComponent },
    { path: 'table', component: TableExpandableRowsExample }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
