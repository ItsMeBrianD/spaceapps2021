export function leftPad(num: number): string {
    if (num >= 10) return num.toString();
    return `0${num}`;
}
