import { combineReducers } from 'redux'
import channel from './channel'
import global from './global'
import enveloping from './enveloping'

export default combineReducers({
  enveloping,
  channel,
  global,
})
