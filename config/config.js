const getBaseUrl = async (req) => {

  const protocol = req.headers['x-forwarded-proto']
  const host = req.headers['x-forwarded-host']

  return `${protocol}://${host}` 
}

module.exports = { getBaseUrl }