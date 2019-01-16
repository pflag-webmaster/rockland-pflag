import { Component, OnInit } from "@angular/core";
import { EventService } from "@services/eventService.service";

@Component({
  selector: "pf-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  monthsFull = [
    null,
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  monthsShort = [
    null,
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  daysInMonth = [];
  daysFull = [
    null,
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  daysShort = [null, "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  dayIndices = [7, 1, 2, 3, 4, 5, 6];

  actualToday = new Date();
  actualDom = this.actualToday.getDate();
  actualRefMon = this.actualToday.getMonth();
  actualMon = this.actualRefMon + 1;
  actualYear = this.actualToday.getFullYear();

  lastMonth: any;
  thisMonth: any;

  monthFull: string;
  year: number;

  weeks: any = [];

  eventList: any = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.getEvents(null, null);
  }

  getEvents(newMonth, newYear) {
    this.eventService.getEvents().subscribe(results => {
      this.eventList = [];
      this.eventService.eventsBS.next(results);
      console.log(results);

      this.buildCalendar(newMonth, newYear, results);
    });
  }

  buildCalendar(newMonth, newYear, events) {
    this.weeks = [];

    var today;

    if (newMonth != null && newYear != null) {
      today = new Date(newYear, newMonth, 1);
    } else {
      today = new Date();
      const refMon = today.getMonth();
    }

    const dom = today.getDate();
    const refMon = today.getMonth();
    const mon = refMon + 1;
    this.monthFull = this.monthsFull[mon];
    this.year = today.getFullYear();

    this.lastMonth = this.getLastMonthInfo(mon, this.year);
    this.thisMonth = this.getThisMonthInfo(mon, this.year);

    //console.log('this.lastMonth:',this.lastMonth);
    //console.log('this.thisMonth:',this.thisMonth);

    var startMonth = this.lastMonth.lastMonthRef;
    var startMonthDate = this.lastMonth.firstDateOfLastWeekOfLastMonth;
    var startMonthYear = this.lastMonth.lastMonthYear;

    if (this.lastMonth.dayOfWeekOfLastDayOfLastMonth === 7) {
      startMonthDate = 1;
    }

    var endMonth = this.thisMonth.nextMonthRef;
    var endMonthDate = this.thisMonth.nextMonthLastDateDisplayed;
    var endMonthYear = this.thisMonth.nextMonthYear;

    if (endMonthDate === 0) {
      endMonth = -1;
      endMonthDate = -1;
    }

    var monthInfo = {
      startMonth: startMonth,
      startMonthDate: startMonthDate,
      startMonthYear: startMonthYear,
      thisMonth: this.thisMonth.thisMonth,
      thisYear: this.thisMonth.thisYear,
      endMonth: endMonth,
      endMonthDate: endMonthDate,
      endMonthYear: endMonthYear
    };

    this.processEvents(events, monthInfo);

    var currDOM = 1;
    var currMon = mon;
    var currYear = null;
    var currWeek = 0;

    // Week One Partial
    if (this.lastMonth.dayOfWeekOfLastDayOfLastMonth < 7) {
      currDOM = this.lastMonth.firstDateOfLastWeekOfLastMonth;
      currMon = this.lastMonth.lastMonth;
      currYear = this.lastMonth.lastMonthYear;

      var monthType = "other";
      if (this.weeks[currWeek] === undefined) {
        this.weeks[currWeek] = [];
      }
      for (var i = 1; i <= 7; i++) {
        var eventString = this.getEventString(currYear, currMon, currDOM);
        var isToday = false;
        if (
          currDOM === this.actualDom &&
          currMon === this.actualMon &&
          currYear === this.actualYear
        ) {
          isToday = true;
        }

        this.weeks[currWeek].push({
          dom: currDOM,
          monthType: monthType,
          eventString: eventString,
          today: isToday
        });

        if (currDOM === this.lastMonth.lastDayOfLastMonth) {
          currDOM = 0;
          currYear = this.thisMonth.thisYear;
          currMon = mon;
          monthType = "this";
        }

        currDOM++;
      }

      currWeek++;
    }

    // Full Weeks
    var monthType = "this";
    currYear = this.thisMonth.thisYear;
    while (currDOM + 6 < this.thisMonth.lastDayOfThisMonth) {
      for (var i = 1; i <= 7; i++) {
        var eventString = this.getEventString(currYear, currMon, currDOM);

        if (this.weeks[currWeek] === undefined) {
          this.weeks[currWeek] = [];
        }
        var isToday = false;
        if (
          currDOM === this.actualDom &&
          currMon === this.actualMon &&
          currYear === this.actualYear
        ) {
          isToday = true;
        }
        this.weeks[currWeek].push({
          dom: currDOM,
          monthType: monthType,
          eventString: eventString,
          today: isToday
        });
        currDOM++;
      }
      currWeek++;
    }

    //Last Week
    if (currDOM <= this.thisMonth.lastDayOfThisMonth) {
      var monthType = "this";

      if (this.weeks[currWeek] === undefined) {
        this.weeks[currWeek] = [];
      }
      for (var i = 1; i <= 7; i++) {
        var eventString = this.getEventString(currYear, currMon, currDOM);
        var isToday = false;
        if (
          currDOM === this.actualDom &&
          currMon === this.actualMon &&
          currYear === this.actualYear
        ) {
          isToday = true;
        }
        this.weeks[currWeek].push({
          dom: currDOM,
          monthType: monthType,
          eventString: eventString,
          today: isToday
        });

        if (currDOM == this.thisMonth.lastDayOfThisMonth) {
          currDOM = 0;
          currYear = this.thisMonth.nextMonthYear;
          currMon = this.thisMonth.nextMonth;
          monthType = "other";
        }
        currDOM++;
      }
    }
  }

  getLastMonthInfo(thisMonth, year) {
    var refMonth = thisMonth - 2;
    var lastMonth = thisMonth - 1;
    var lastMonthYear = year;

    var monthInfo = {
      lastMonth: null,
      lastMonthRef: refMonth,
      lastMonthYear: null,
      lastDayOfLastMonth: null,
      dayOfWeekOfLastDayOfLastMonth: null,
      firstDateOfLastWeekOfLastMonth: null
    };

    if (thisMonth === 1) {
      refMonth = 11;
      lastMonth = 12;
      lastMonthYear = year - 1;
    }

    const lastMon = new Date(lastMonthYear, refMonth, 1);
    monthInfo.lastMonth = lastMonth;
    monthInfo.lastMonthRef = refMonth;
    monthInfo.lastMonthYear = lastMonthYear;

    monthInfo.lastDayOfLastMonth = new Date(
      lastMonthYear,
      lastMonth,
      0
    ).getDate();

    const lastDay = new Date(
      lastMonthYear,
      refMonth,
      monthInfo.lastDayOfLastMonth
    );

    monthInfo.dayOfWeekOfLastDayOfLastMonth = this.dayIndices[lastDay.getDay()];
    monthInfo.firstDateOfLastWeekOfLastMonth =
      monthInfo.lastDayOfLastMonth -
      monthInfo.dayOfWeekOfLastDayOfLastMonth +
      1;

    return monthInfo;
  }

  getThisMonthInfo(thisMonth, year) {
    var refMonth = thisMonth;
    var nextMonth = thisMonth + 1;
    var nextMonthYear = year;

    var monthInfo = {
      nextMonth: null,
      nextMonthRef: null,
      nextMonthYear: null,
      lastDayOfThisMonth: null,
      thisMonth: thisMonth,
      thisYear: year,
      lastDayOfThisMonthDOW: null,
      nextMonthLastDateDisplayed: null
    };

    if (thisMonth === 12) {
      refMonth = 0;
      nextMonth = 1;
      nextMonthYear = year + 1;
    }

    const nextMon = new Date(nextMonthYear, refMonth, 1);
    monthInfo.nextMonth = nextMonth;
    monthInfo.nextMonthRef = refMonth;
    monthInfo.nextMonthYear = nextMonthYear;

    var dateObj = new Date(year, thisMonth, 0);
    monthInfo.lastDayOfThisMonth = dateObj.getDate();
    monthInfo.lastDayOfThisMonthDOW = dateObj.getDay();

    monthInfo.nextMonthLastDateDisplayed = 7 - monthInfo.lastDayOfThisMonthDOW;

    if (monthInfo.nextMonthLastDateDisplayed === 7) {
      monthInfo.nextMonthLastDateDisplayed = 0;
    }
    return monthInfo;
  }

  getEventString(currYear, currMon, currDOM) {
    var strYear = currYear.toString();

    currMon < 10 ? (currMon = "0" + currMon) : currMon.toString();
    var strMon = currMon;

    currDOM < 10 ? (currDOM = "0" + currDOM) : currDOM.toString();
    var strDOM = currDOM;

    return strYear + strMon + strDOM;
  }

  processEvents(events, monthInfo) {
    var startMonthRef = monthInfo.startMonth;
    var startMonthYear = monthInfo.startMonthYear;
    var endMonthRef = monthInfo.endMonth;
    var endMonthYear = monthInfo.endMonthYear;
    var thisMonth = monthInfo.thisMonth;
    var thisYear = monthInfo.thisYear;

    var startMonth: any = startMonthRef + 1;
    startMonth < 10
      ? (startMonth = "0" + startMonth)
      : (startMonth = startMonth.toString());

    var endMonth: any = endMonthRef + 1;
    endMonth < 10
      ? (endMonth = "0" + endMonth)
      : (endMonth = endMonth.toString());

    for (var event of events) {
      // Recurring Events
      if (event.recurring) {
        // This event is recurring
        var wom = event.wom;
        var dow = event.dow;

        var prevWantedDOM: any = -1;
        if (startMonth !== thisMonth) {
          prevWantedDOM = this.getThirdTuesday(
            dow,
            wom,
            startMonth,
            startMonthYear
          );
        }
        var wantedDOM: any = this.getThirdTuesday(
          dow,
          wom,
          thisMonth,
          thisYear
        );
        var nextWantedDOM: any = -1;
        if (endMonth > 0) {
          nextWantedDOM = this.getThirdTuesday(
            dow,
            wom,
            endMonth,
            endMonthYear
          );
        }

        if (prevWantedDOM > 0) {
          prevWantedDOM < 10
            ? (prevWantedDOM = "0" + prevWantedDOM)
            : (prevWantedDOM = prevWantedDOM.toString());
          const dateString = startMonthYear + startMonth + prevWantedDOM;

          if (this.eventList[dateString] === undefined) {
            this.eventList[dateString] = [];
          }
          this.eventList[dateString].push({
            title: event.title,
            desc: event.description
          });
        }
        if (wantedDOM > 0) {
          var month: any = thisMonth;
          month < 10 ? (month = "0" + month) : (month = month.toString());

          wantedDOM < 10
            ? (wantedDOM = "0" + wantedDOM)
            : (wantedDOM = wantedDOM.toString());
          const dateString = thisYear + month + wantedDOM;

          if (this.eventList[dateString] === undefined) {
            this.eventList[dateString] = [];
          }

          this.eventList[dateString].push({
            title: event.title,
            desc: event.description
          });
        }
        if (nextWantedDOM > 0) {
          nextWantedDOM < 10
            ? (nextWantedDOM = "0" + nextWantedDOM)
            : (nextWantedDOM = nextWantedDOM.toString());
          const dateString = endMonthYear + endMonth + nextWantedDOM;

          if (this.eventList[dateString] === undefined) {
            this.eventList[dateString] = [];
          }
          this.eventList[dateString].push({
            title: event.title,
            desc: event.description
          });
        }
      }

      // One Off Evetns
      if (!event.recurring) {
        // This event is NOT recurring, it is a one-off
        var month: any = event.month;
        var dom: any = event.dom;
        month < 10 ? (month = "0" + month) : (month = month.toString());
        dom < 10 ? (dom = "0" + dom) : (dom = dom.toString());

        const dateString = event.year + month + dom;

        if (this.eventList[dateString] === undefined) {
          this.eventList[dateString] = [];
        }

        var info = {
          title: event.title,
          desc: event.description
        };

        this.eventList[dateString].push(info);
      }
    }
  }

  getThirdTuesday(dow, wom, mon, year) {
    // need to get current month reference
    mon === 1 ? (mon = 0) : (mon -= 1);

    var start = new Date(year, mon, 1);
    var lastDOM = new Date(year, mon, -1).getDate();

    var monthStartsOnA = start.getDay();
    monthStartsOnA === 0
      ? (monthStartsOnA = 7)
      : (monthStartsOnA = monthStartsOnA);

    var firstIncidence;
    if (dow < monthStartsOnA) {
      firstIncidence = dow + (8 - monthStartsOnA);
    } else {
      firstIncidence = dow - monthStartsOnA + 1;
    }

    var wantedDOM = firstIncidence + 7 * (wom - 1);

    if (wantedDOM > lastDOM) {
      wantedDOM = -1;
    }

    return wantedDOM;
  }
}
