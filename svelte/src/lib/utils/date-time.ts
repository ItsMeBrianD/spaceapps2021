const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const isLeapYear = year => year % 4 === 0;
const getEmptyRows = () => Array.from({length: 42}).map(() => []);
const getMonthDays = (index, year) => (index !== 1 ? monthDays[index] : isLeapYear(year) ? 29 : 28);

const getMonthStats = (monthIndex, year) => {
    const today = new Date(year, monthIndex, 1);
    const index = today.getMonth();
    return {
        name: index[index],
        days: getMonthDays(index, year),
    };
};

export const getMonthName = index => monthNames[index];

export const getDateRows = (monthIndex, year) => {
    const {days} = getMonthStats(monthIndex, year);
    const rows = getEmptyRows();
    const startIndex = new Date(year, monthIndex, 1).getDay();
    Array.from({length: days}).forEach((_, i) => {
        const index = startIndex + i;
        rows[index] = i + 1;
    });
    const filled = rows.map(i => (Array.isArray(i) ? undefined : i));

    return filled[35] ? filled : filled.slice(0, -7);
};

export const noop = () => { };

export const uuid = (() => {
    let id = 1;
    return () => ++id;
})();

export const millisToYMD = (millis: number): [number, number, number] => {
    const date = new Date(millis);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    // eslint-disable-next-line @typescript-eslint/no-extra-parens
    const day = date.getUTCDate() + (date.getUTCHours() / 24) + (date.getUTCMinutes() / (60 * 24)) + (date.getUTCSeconds() / (60 * 60 * 24)) + (date.getUTCMilliseconds() / (1000 * 60 * 60 * 24));
    console.log(`${millis} -> ${year} ${month} ${day}`);
    return [year, month, day];
};

export const getTimeArray = (startTimestamp: number, periodMinutes: number, numPoints: number): number[] => {
    const periodMillis = periodMinutes * 60 * 1000;
    const periodFrac = periodMillis/(numPoints-1);
    const arr = [startTimestamp];
    for (let i = 1; i < numPoints; i++) {
        arr.push(arr[i-1] + periodFrac);
    }
    return arr;
}