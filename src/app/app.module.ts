import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SoldPriceComponent } from './sold-price/sold-price.component';
import {HttpClientModule} from '@angular/common/http';
import { ChartsModule } from 'ng2-charts-x';

@NgModule({
  declarations: [
    AppComponent,
    SoldPriceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
