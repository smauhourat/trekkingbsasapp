import { v4 as uuidv4 } from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from './types'

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4()

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  })

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
}

export const setAlertNavigate = (msg, alertType, navigate, to='/', timeout = 5000) => dispatch => {
  const id = uuidv4()

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  })

  setTimeout(() => { 
    dispatch({ type: REMOVE_ALERT, payload: id }) 
    navigate(to)
  }, timeout)

}
