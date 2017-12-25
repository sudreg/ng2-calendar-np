import { Component } from '@angular/core';
import { NepaliCalendarService } from "./calendar/nepali-calendar.service";

@Component({
    selector: 'my-app',
    templateUrl: "app/app.html"
})

export class AppComponent {

    private npDate: any;

    private engDate: any;
    constructor(private npCalService: NepaliCalendarService) {

    }

    ConvertNepToEng() {
        this.engDate = this.npCalService.ConvertNepToEngDate(this.npDate);
    }

}
