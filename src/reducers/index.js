import { combineReducers } from 'redux'
import channel from './channel'
import global from './global'

export default combineReducers({
  channel,
  global,
})
