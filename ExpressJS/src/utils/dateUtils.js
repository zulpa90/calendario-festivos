function dateUTC(year, month, day) {
  return new Date(Date.UTC(year, month - 1, day));
}

function addDays(date, days) {
  const result = new Date(date.getTime());
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function getNextMonday(year, month, day) {
  let date = dateUTC(year, month, day);
  const dayOfWeek = date.getUTCDay();

  if (dayOfWeek !== 1) {
    if (dayOfWeek > 1) {
      date = addDays(date, 8 - dayOfWeek);
    } else {
      date = addDays(date, 1);
    }
  }

  return date;
}

function getPalmSunday(year) {
  const a = year % 19;
  const b = year % 4;
  const c = year % 7;
  const d = (19 * a + 24) % 30;

  const days = d + ((2 * b + 4 * c + 6 * d + 5) % 7);
  const day = 15 + days;

  return dateUTC(year, 3, day);
}

function getEasterSunday(year) {
  return addDays(getPalmSunday(year), 7);
}

function isSameDate(a, b) {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

function formatDateISO(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isValidDate(year, month, day) {
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

module.exports = {
  addDays,
  dateUTC,
  formatDateISO,
  getEasterSunday,
  getNextMonday,
  isSameDate,
  isValidDate
};
