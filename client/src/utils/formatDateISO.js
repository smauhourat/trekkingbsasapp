const moment = require('moment');

function formatDateISO(date) {
    return moment(new Date(date?.replace('Z', ''))).format("YYYY-MM-DD");
}

export default formatDateISO;
