import { Component } from '@angular/core';
import { Input, Output, EventEmitter, OnInit } from "@angular/core";
import { NepaliCalendarService } from './nepali-calendar.service';
import {
    NepaliDate, NepaliMonth, NepaliDay, NepaliYear, NepaliHours, NepaliMinutes, NepaliAMPM
} from './nepali-dates';

import * as moment from 'moment/moment';

@Component({
    selector: "np-calendar",
    templateUrl: "app/calendar/nepali-calendar.html"
})
export class NepaliCalendarComponent {
    private npDateModel: NepaliDate = new NepaliDate();

    private showCalendar: boolean = false;
    private dayNo: number;
    private monthNo: number;
    private yearNo: number;
    private hoursNo: number;
    private minutesNo: number;
    private amPm: string;

    private nepYears: Array<NepaliYear> = [];
    private nepMonths: Array<NepaliMonth> = [];
    private nepDays: Array<NepaliDay> = [];
    private hoursList: Array<NepaliHours> = [];
    private minutesList: Array<NepaliMinutes> = [];
    private amPMList: Array<NepaliAMPM> = [];

    @Input("showTime")
    private showTime: boolean = false;

    @Input("display")
    private display: string = "multi-line";

    @Output() ngModelChange = new EventEmitter();
    //we'll bind the npDateModel to ngModel so that we can use it as [(ngModel)] in required html pages..
    //for which we've to write get and set.
    @Input()
    set ngModel(npDate: NepaliDate) {
        //first time we get npDate=undefined, and on change of only one of (date, year,month) we get only the changed element.
        //so keeping the check of IsValidNepDate..
        if (npDate && this.IsValidNepDate(npDate)) {
            this.npDateModel = npDate;
            this.dayNo = this.npDateModel.Day;
            this.monthNo = this.npDateModel.Month;
            this.yearNo = this.npDateModel.Year;
            this.hoursNo = this.npDateModel.Hours;
            this.minutesNo = this.npDateModel.Minutes;
            this.amPm = this.npDateModel.AMPM;
        }
    }
    get ngModel() {
        return this.npDateModel;
    }


    constructor(private npCalendarService: NepaliCalendarService) {
        this.LoadTimeDetails();
        this.LoadTodaysDate();
        this.LoadDayMthYears();
        this.showCalendar = true;
        this.npDateModel = { Year: this.yearNo, Month: this.monthNo, Day: this.dayNo, Hours: this.hoursNo, Minutes: this.minutesNo, AMPM: this.amPm };
    }

    //matches regular exprsn for : YYYY-MM-DD eg: 2060-10-18, etc.
    private IsValidNepDate(nplDate: NepaliDate) {
        let ipDate = nplDate.Year + "-" + nplDate.Month + "-" + nplDate.Day;
        //matching formats: 2011-1-17, 2011-01-9, 2011-01-23, etc..
        var regEx = /^\d{4}-\d{1,2}-\d{1,2}$/;
        return ipDate.match(regEx) != null;
    }

    LoadDayMthYears() {
        //min 2000BS, max 2079BS.. increase this limit in future..
        this.nepYears = NepaliYear.GetAllNepaliYears();

        this.nepMonths = NepaliMonth.GetNepaliMonths();
    }

    //Implementation Pending.--sud: 17Dec17
    //currently: npCalendarOnChange event doesn't fire after this event.
    SetTodaysDateOnClick() {
        this.LoadTodaysDate();
        this.ngModelChange.emit(this.npDateModel);
    }

    LoadTodaysDate() {
        let nepDateToday = this.npCalendarService.GetTodaysNepDate();
        this.dayNo = nepDateToday.Day;
        this.monthNo = nepDateToday.Month;
        this.yearNo = nepDateToday.Year;
        this.hoursNo = nepDateToday.Hours;
        this.minutesNo = nepDateToday.Minutes;
        this.amPm = nepDateToday.AMPM;
        this.LoadDaysOnMonthChange();
    }

    LoadDaysOnMonthChange() {
        this.nepDays = this.npCalendarService.GetDaysOfMonth(this.yearNo, this.monthNo);
        //if earlier selected dayNumber is more than the no. of days in current month then reset day to 1.
        if (this.nepDays.length < this.dayNo) {
            this.dayNo = 1;
        }
    }

    OnCalendarChange() {
        this.npDateModel = {
            Year: parseInt(this.yearNo.toString()),
            Month: parseInt(this.monthNo.toString()),
            Day: parseInt(this.dayNo.toString()),
            Hours: parseInt(this.hoursNo.toString()),
            Minutes: parseInt(this.minutesNo.toString()),
            AMPM: this.amPm
        };
        //we've to emit this model on change of Day,Month,Year all..
        this.ngModelChange.emit(this.npDateModel);
    }

    ngOnInit() {
        this.ngModelChange.emit(this.npDateModel);
    }
    LoadTimeDetails() {
        this.hoursList = NepaliHours.GetAllNepaliHours();
        this.minutesList = NepaliMinutes.GetAllNepaliMinutes();
        this.amPMList = NepaliAMPM.GetAMPM();
    }
    /////DON'T USE ngOnChanges(), it goes in a recursive loop..--
    ////ngOnChanges() {
    ////    this.npDateModel = { Year: this.yearNo, Month: this.monthNo, Day: this.dayNo };
    ////    this.ngModelChange.emit(this.npDateModel);
    ////}
}
