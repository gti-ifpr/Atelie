import { addZero } from "./addZeroToDate";

export function getCurrentHourInString(currentDate: Date) {
    let hoursNow = addZero(currentDate.getHours()) + ":" + addZero(currentDate.getMinutes());

    return hoursNow;
}