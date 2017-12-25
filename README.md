# ng2-calendar-np
A reusable nepali calendar component date converter for angular2 and angular4 applications.
Converts from AD to BS and BS to AD

# Features:
1. English to Nepali date conversion and vice-versa
2. Display a Nepali Calendar (basic) which can be directly binded as a [(ngModel)]
3. Loads today's date by default

# Implementation steps:
1. Clone or download this into your local
2. copy paste the folder : app/calendar inside your destined location
3. add following in your code:


------------app.module:------------------------------------------

import { NepaliCalendarModule } from "your-local-folder-path/calendar/nepali-calendar.module";

@NgModule({
 imports: [NepaliCalendarModule],
});
------------html/CSHTML-----------------
<np-calendar ngDefaultControl [(ngModel)]="npDate" 
(ngModelChange)="ConvertNepToEng()">

---app.component  (or your required component)---


export class AppComponent {

    private npDate: any;
    private engDate: any;
    constructor(private npCalService: NepaliCalendarService) {
    }
    ConvertNepToEng(){
        this.engDate = this.npCalService.ConvertNepToEngDate(this.npDate);
    }
  } 
  


# Dependencies:
moment.js

# Coming soon:
* Better UI look and feel
* installable as npm-package
* feature enhancements
* documentation

please send me email to 'sudarshan.reg@gmail.com' with your github id  if you face any issues. 

## Contributors are welcomed
This module is only improved and maintained by contributors like you;

As a contributor You can contribute to the following;
  * Updating README.md
  * Improvising the UI
  * Answering issues and building FAQ
  * Documentation
  
  

