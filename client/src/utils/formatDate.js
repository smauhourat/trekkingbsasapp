function formatDate(date) {
    return new Intl.DateTimeFormat('es-ES').format(new Date(date?.replace('Z', '')));
  }
  
  export default formatDate;
  