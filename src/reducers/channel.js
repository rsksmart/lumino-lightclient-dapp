import {
  CHANNELS_LOADED,
  OPEN_PAY_MODAL,
  CHANGE_PAY_MODAL,
  OPEN_DEPOSIT_MODAL,
  CHANGE_DEPOSIT_MODAL,
} from '../constants/action-types'

const initialState = {
  list: [],
  openedPayModal: null,
  openedDepositModal: null,
}
const channel = (state = initialState, action) => {
  switch (action.type) {
    case CHANNELS_LOADED:
      return {
        ...state,
        list: action.channels,
      }
    case OPEN_PAY_MODAL:
      return {
        ...state,
        openedPayModal: action.modal,
      }
    case CHANGE_PAY_MODAL:
      return {
        ...state,
        openedPayModal: action.modal,
      }
    case OPEN_DEPOSIT_MODAL:
      return {
        ...state,
        openedDepositModal: action.modal,
      }
    case CHANGE_DEPOSIT_MODAL:
      return {
        ...state,
        openedDepositModal: action.modal,
      }
    default:
      return state
  }
}

export default channel
