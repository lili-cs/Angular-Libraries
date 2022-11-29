import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResponsivePieChartModule } from 'responsive-pie-chart';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResponsivePieChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
