export function addOneDay(date: string) {
    return new Date(date).setDate(new Date(date).getDate() + 1);
}