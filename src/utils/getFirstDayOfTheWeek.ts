import { getCurrentDateInString } from "./getCurrentDateInString";


export function getFirstDayOfTheWeek(day: Date) {
    const week = day.getDay();
    const date = day.getDate();

    const firstDayOfTheWeek = getCurrentDateInString(new Date(day.setDate(date - week)));
    const lastDayOfTheWeek = getCurrentDateInString(new Date(day.setDate(new Date(firstDayOfTheWeek).getDate() + 7)));
    return ({ firstDayOfTheWeek, lastDayOfTheWeek })
}