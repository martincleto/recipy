import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot()
  ],
})

export class AppModule {}
