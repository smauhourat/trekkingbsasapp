function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date?.replace('Z', '')));
  }
  
  export default formatDate;
  