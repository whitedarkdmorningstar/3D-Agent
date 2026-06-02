import { Week } from "../settings/schema";

const DATE1 = 1;
const DATE2 = 16;
const HOUR = 15;

export function generateCurrentWeek(): Week {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth();
  const hour = today.getHours();

  // Last year's 24th week
  // For 1st day of 1st month, before 3 PM, it's still last year's 24th week
  if (date === DATE1 && month === 0 && hour < HOUR) {
    return 0;
  } else if (date === DATE1 && month === 0 && hour >= HOUR) {
    // For 1st day of 1st month, after 3 PM, it's next year's 1st week
    return 1;
  } else if (
    // For 1st to 15th day of each month, it's the first week of that month
    (date === DATE1 && hour >= HOUR) ||
    (date > DATE1 && date < DATE2) ||
    (date === DATE2 && hour < HOUR)
  ) {
    return ((month + 1) * 2 - 1) as Week;
  } else if ((date === DATE2 && hour >= HOUR) || date > DATE2) {
    return ((month + 1) * 2 - 0) as Week;
  } else {
    return 0;
  }
}

export function generateWeekDuration(
  week: Week,
  year: number,
): { start: Date; end: Date } {
  const month = (week % 2) + week / 2 - 1;
  const startDate = week % 2 === 1 ? DATE1 : DATE2;
  const endDate = week % 2 === 1 ? DATE2 : DATE1;

  if (week === 0) {
    return {
      start: new Date(year - 1, 11, DATE2),
      end: new Date(year, 0, DATE1),
    };
  }

  if (week % 2 === 1) {
    return {
      start: new Date(year, month, startDate),
      end: new Date(year, month, endDate),
    };
  } else {
    return {
      start: new Date(year, month, startDate),
      end: new Date(year, month + 1, endDate),
    };
  }
}
