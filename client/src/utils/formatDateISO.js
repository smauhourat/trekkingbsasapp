const moment = require('moment');

function formatDateISO(date) {
    return moment(date).format("YYYY-MM-DD");
}

export default formatDateISO;
