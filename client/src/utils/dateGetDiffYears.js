function parseDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function getDateDifferenceInMilliseconds(date1, date2) {
  return date2 - date1;
}

function millisecondsToYears(milliseconds) {
  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25; // Approximate milliseconds in a year
  return milliseconds / millisecondsPerYear;
}

function dateGetDiffYears(dateString1, dateString2) {
  const date1 = parseDate(dateString1);
  const date2 = parseDate(dateString2);

  const differenceInMilliseconds = getDateDifferenceInMilliseconds(date1, date2);
  const differenceInYears = millisecondsToYears(differenceInMilliseconds);

  return Math.floor(differenceInYears);
}


export default dateGetDiffYears
