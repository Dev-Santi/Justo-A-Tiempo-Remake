"use strict";
// class CalendarManager {
//     -calendars : ArrayList<Calendar>
//     +CalendarManager()
//     +getCalendars() : ArrayList<Calendar>
//     +addCalendar(Calendar newCalendar) : void
//     +getCalendar(String year) : Calendar
//     +createCalendar(String year, String firstDay) : Calendar
//     +createLeapYearCalendar(String year, String firstDay) : Calendar
//     +addHolidaysToCalendar(Calendar calendar, Holiday[] holidays)
var CalendarManager = /** @class */ (function () {
    function CalendarManager() {
        this.dayNames = [
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
            'Domingo',
        ];
        this.monthsLength = [
            31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
        ];
        this.calendars = [];
    }
    CalendarManager.prototype.getMonthLength = function (i) {
        if (i < 0 || i >= 12) {
            throw new Error('No se puede acceder al largo de un mes que no existe.');
        }
        return this.monthsLength[i];
    };
    CalendarManager.prototype.getDayName = function (i) {
        if (i < 0 || i >= 7) {
            throw new Error('No se puede acceder al nombre de un dia que no existe.');
        }
        return this.dayNames[i];
    };
    CalendarManager.prototype.getCalendars = function () {
        return this.calendars;
    };
    CalendarManager.prototype.addCalendar = function (calendar) {
        this.getCalendars().push(calendar);
    };
    CalendarManager.prototype.hasCalendar = function (year) {
        var found = false;
        for (var i = 0; i < this.getCalendars().length && !found; i++) {
            if (this.getCalendars()[i].getYear() == year) {
                found = true;
            }
        }
        return found;
    };
    CalendarManager.prototype.getCalendar = function (year) {
        for (var i = 0; i < this.getCalendars().length; i++) {
            if (this.getCalendars()[i].getYear() == year) {
                return this.getCalendars()[i];
            }
        }
        throw new Error('El año buscado no existe en el calendario');
    };
    CalendarManager.prototype.createCalendar = function (year, firstDay) {
        var currentName = firstDay;
        var dates = this.createEmptyDates();
        for (var i = 0; i < 12; i++) {
            for (var j = 0; j < this.getMonthLength(i); j++) {
                dates[i].push(new Day(this.getDayName(currentName), this.dateToString(j, i, year)));
                currentName = this.getNextDayName(currentName);
            }
        }
        return new Calendar(year, dates);
    };
    CalendarManager.prototype.createEmptyDates = function () {
        return [[], [], [], [], [], [], [], [], [], [], [], []];
    };
    CalendarManager.prototype.dateToString = function (day, month, year) {
        return '' + (day + 1) + '/' + (month + 1) + '/' + year;
    };
    CalendarManager.prototype.getNextDayName = function (dayName) {
        if (dayName < 6) {
            return dayName + 1;
        }
        return 0;
    };
    return CalendarManager;
}());