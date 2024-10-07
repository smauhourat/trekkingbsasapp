function handleError (err, defaultMessage) {
  const error = new Error(defaultMessage)
  error.message += err.response.data?.msg ? ` ${err.response.data?.msg}` : ""
  error.code = err.response.status
  error.info = err.response.data
  error.errors = err.response?.data?.errors
  // console.log('http error.errors', error.errors)
  // console.log('error en http =>', JSON.stringify(err))
  //console.log('handleError()', error.message)
  
  throw error
}

export default handleError