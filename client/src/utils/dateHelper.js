const moment = require('moment')

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

export const dateGetDiffYears = (dateString1, dateString2) => {
  const date1 = parseDate(dateString1);
  const date2 = parseDate(dateString2);

  const differenceInMilliseconds = getDateDifferenceInMilliseconds(date1, date2);
  const differenceInYears = millisecondsToYears(differenceInMilliseconds);

  return Math.floor(differenceInYears);
}

export const formatDateISOFromDate = (date) => {
  return moment(date).format('YYYY-MM-DD')
}

export const formatDate = (date) => {
  if (date === undefined || date === '') { return null }
  return new Intl.DateTimeFormat('es-ES').format(new Date(date?.replace('Z', '')))
}

export const formatDateISO = (date) => {
  return moment(new Date(date?.replace('Z', ''))).format('YYYY-MM-DD')
}

export const formatDateTimeBsAs = (date) => {
  if (date === undefined || date === '') { return null }
  return new Intl.DateTimeFormat('es-ES', {
      dateStyle: "short",
      timeZone: "America/Buenos_Aires",
      timeStyle: "short"
   }).format(new Date(date))
}
