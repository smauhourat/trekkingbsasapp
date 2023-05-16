const REACT_APP_RECORDS_PER_PAGE = process.env.REACT_APP_RECORDS_PER_PAGE

const environment = {
  recordsPerPage: REACT_APP_RECORDS_PER_PAGE !== undefined ? REACT_APP_RECORDS_PER_PAGE : 5
}

export default environment;
