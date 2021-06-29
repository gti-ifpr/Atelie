import { getCurrentDateHourInString } from "./getCurrentDateInString";


export function getFirstDayOfTheWeek(day: Date) {
    const week = day.getDay();
    const date = day.getDate();

    const firstDayOfTheWeek = getCurrentDateHourInString(new Date(day.setDate(date - week)));
    const lastDayOfTheWeek = getCurrentDateHourInString(new Date(day.setDate(new Date(firstDayOfTheWeek).getDate() + 7)));

    console.log(firstDayOfTheWeek, lastDayOfTheWeek)
    return ({ firstDayOfTheWeek, lastDayOfTheWeek })
}