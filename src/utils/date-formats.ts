type Options = {
  dateFormat:
    | "Year,Month,Day"
    | "Day,Month,Year"
    | "ShortMonth Day, Year"
    | "FullMonth Day, Year";
  separator: "-" | "/" | ".";
  timeFormat:
    | "Hour"
    | "Hour:Minute"
    | "Hour:Minute:Second"
    | "Hour:Minute:Second:Millisecond";
  twoDigitYear: boolean;
  twoDigitMonth: boolean;
  twoDigitDay: boolean;
  twoDigitHour: boolean;
  twoDigitMinute: boolean;
  twoDigitSecond: boolean;
  showAmPm: boolean;
};

const DefaultOptions: Options = {
  dateFormat: "Day,Month,Year",
  timeFormat: "Hour:Minute",
  separator: "-",
  twoDigitYear: false,
  twoDigitMonth: true,
  twoDigitDay: true,
  twoDigitHour: true,
  twoDigitMinute: true,
  twoDigitSecond: true,
  showAmPm: true,
};

const MONTHS = [
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

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

type DateTimeDay = { date: string; time: string; day: (typeof DAYS)[number] };

export function formatedDateTime(
  input: Date | number,
  options?: Options,
): DateTimeDay {
  const date = typeof input === "number" ? new Date(input) : input;

  const opts = { ...DefaultOptions, ...options };
  const day = opts.twoDigitDay
    ? date.getDate().toString().padStart(2, "0")
    : date.getDate();
  const month = opts.twoDigitMonth
    ? (date.getMonth() + 1).toString().padStart(2, "0")
    : date.getMonth() + 1;
  const year = opts.twoDigitYear
    ? date.getFullYear().toString().slice(-2)
    : date.getFullYear();
  const hour = opts.showAmPm
    ? date.getHours() % 12
    : date.getHours() === 0
      ? 12
      : opts.twoDigitHour
        ? date.getHours().toString().padStart(2, "0")
        : date.getHours();
  const minute = opts.twoDigitMinute
    ? date.getMinutes().toString().padStart(2, "0")
    : date.getMinutes();
  const second = opts.twoDigitSecond
    ? date.getSeconds().toString().padStart(2, "0")
    : date.getSeconds();
  const millisecond = date.getMilliseconds().toString().padStart(3, "0");
  const dayOfWeek = DAYS[date.getDay()];
  const amPm = opts.showAmPm ? (date.getHours() >= 12 ? "PM" : "AM") : "";

  const { separator, dateFormat, timeFormat } = opts;
  const obj = { date: "", time: "", day: dayOfWeek } as DateTimeDay;

  if (dateFormat === "ShortMonth Day, Year") {
    obj.date = `${MONTHS_SHORT[date.getMonth()]} ${day}, ${year}`;
  } else if (dateFormat === "FullMonth Day, Year") {
    obj.date = `${MONTHS[date.getMonth()]} ${day}, ${year}`;
  } else if (dateFormat === "Year,Month,Day") {
    obj.date = `${year}${separator}${month}${separator}${day}`;
  } else if (dateFormat === "Day,Month,Year") {
    obj.date = `${day}${separator}${month}${separator}${year}`;
  }

  if (timeFormat === "Hour") {
    obj.time = `${hour}`;
  } else if (timeFormat === "Hour:Minute") {
    obj.time = `${hour}:${minute}`;
  } else if (timeFormat === "Hour:Minute:Second") {
    obj.time = `${hour}:${minute}:${second}`;
  } else if (timeFormat === "Hour:Minute:Second:Millisecond") {
    obj.time = `${hour}:${minute}:${second}:${millisecond}`;
  }

  if (opts.showAmPm) {
    obj.time += ` ${amPm}`;
  }

  return obj;
}
