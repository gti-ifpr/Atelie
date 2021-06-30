import { addZero } from "./addZeroToDate";

export function getCurrentDateInString(currentDate: Date) {
    let dateNow = addZero(currentDate.getFullYear()) + '-' + addZero((currentDate.getMonth() + 1)) + '-' + addZero(currentDate.getDate())

    return dateNow;
}