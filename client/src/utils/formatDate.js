function formatDate(date) {
  if (date === undefined || date === '')
    return null;
  return new Intl.DateTimeFormat('es-ES').format(new Date(date?.replace('Z', '')));
}

export default formatDate;
