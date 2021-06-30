import { getCurrentDateInString } from "./getCurrentDateInString";
import { getCurrentHourInString } from "./getCurrentHourInString";

export function isDayAndHourLessThenToday(day: string, hour: string) {
    const currentDate = new Date();
    let dateNow = getCurrentDateInString(currentDate);

    if (day < dateNow ||
        (day == dateNow &&
            hour < getCurrentHourInString(currentDate))) {
        return true;
    }
    return false;
}