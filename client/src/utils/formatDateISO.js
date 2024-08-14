const moment = require('moment')

function formatDateISO (date) {
  // return moment(new Date(date)).format("YYYY-MM-DD");
  return moment(new Date(date?.replace('Z', ''))).format('YYYY-MM-DD')

  // const ret = moment(new Date(date)).isValid();
  // if (ret) return new Date(moment(new Date(date)).format("YYYY-MM-DD"))
  // return date;
}

export default formatDateISO
