import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MatSortModule } from '@angular/material/sort';
// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainTableComponent } from './components/main-table/main-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataSource } from '@angular/cdk/table';
import { MatButtonModule, MatCheckboxModule, MatTableModule, MatInputModule, MAT_DATE_LOCALE } from '@angular/material';
import { FinishedTableComponent } from './components/finished-table/finished-table.component';
import { NewContractComponent } from './components/new-contract/new-contract.component';
import { PayTimeTableComponent } from './components/pay-time-table/pay-time-table.component';
import { ProcessingTableComponent } from './components/processing-table/processing-table.component';
import { DeleteContractComponent } from './components/delete-contract/delete-contract.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ContractDetailComponent } from './components/contract-detail/contract-detail.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    MainTableComponent,
    FinishedTableComponent,
    NewContractComponent,
    PayTimeTableComponent,
    ProcessingTableComponent,
    DeleteContractComponent,
    ContractDetailComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent],
  entryComponents: [
    DeleteContractComponent,
    ContractDetailComponent
  ]
})
export class AppModule { }
