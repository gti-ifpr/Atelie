export function getFirstDayOfTheWeek(day: Date) {
    const week = day.getDay();
    const date = day.getDate() + 1;
    const firstDayOfTheWeek = date - week;
    const lastDayOfTheWeek = firstDayOfTheWeek + 6;

    return ({ firstDayOfTheWeek, lastDayOfTheWeek })
}