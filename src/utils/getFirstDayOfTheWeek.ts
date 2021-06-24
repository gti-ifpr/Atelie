export function getFirstDayOfTheWeek(day: Date) {
    const week = day.getDay();
    const date = day.getDate();

    const firstDayOfTheWeek = new Date(day.setDate(date - week)).getDate();
    const lastDayOfTheWeek = new Date(day.setDate(firstDayOfTheWeek + 6)).getDate();

    return ({ firstDayOfTheWeek, lastDayOfTheWeek })
}