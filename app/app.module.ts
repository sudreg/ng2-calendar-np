import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NepaliCalendarModule } from "./calendar/nepali-calendar.module";

@NgModule({
    providers: [
       
    ],
    imports: [BrowserModule,
        FormsModule,
        CommonModule,
        NepaliCalendarModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }