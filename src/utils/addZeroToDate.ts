export function addZero(i: number | string) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}