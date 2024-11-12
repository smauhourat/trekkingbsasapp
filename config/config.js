const getBaseUrl = async (req) => {

  const protocol = req.headers['x-forwarded-proto']
  const host = req.headers['x-forwarded-host']

  let ret = ''
  if (protocol != undefined) {
    ret = `${protocol}://${host}`
  } else {
    ret = req.headers['client-base-url']
  }

  //return `${protocol}://${host}`
  return ret
}

module.exports = { getBaseUrl }