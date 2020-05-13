import {
  STARTUP_FINISH,
  CHANGE_OPEN_CHANNEL_MODAL,
} from '../constants/action-types'

const initialState = {
  web3: undefined,
  openedOpenChannel: false,
}
const global = (state = initialState, action) => {
  switch (action.type) {
    case STARTUP_FINISH:
      return {
        ...state,
        web3: action.web3,
      }
    case CHANGE_OPEN_CHANNEL_MODAL:
      return {
        ...state,
        openedOpenChannel: action.newStatus,
      }
    default:
      return state
  }
}

export default global
