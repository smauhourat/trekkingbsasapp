const moment = require('moment');

function formatDateISOFromDate(date) {
    return moment(date).format("YYYY-MM-DD");
}

export default formatDateISOFromDate;
