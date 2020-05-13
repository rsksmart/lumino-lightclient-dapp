import {
  CHANNELS_LOADED,
  OPEN_PAY_MODAL,
  CHANGE_PAY_MODAL,
  OPEN_DEPOSIT_MODAL,
  CHANGE_DEPOSIT_MODAL,
} from '../constants/action-types'

export function channelsLoaded(_channels) {
  return {
    type: CHANNELS_LOADED,
    channels: _channels,
  }
}

export function openPayModal(_modalData) {
  return {
    type: OPEN_PAY_MODAL,
    modal: _modalData,
  }
}

export function changePayModal(_modalData) {
  return {
    type: CHANGE_PAY_MODAL,
    modal: _modalData,
  }
}

export function openDepositModal(_modalData) {
  return {
    type: OPEN_DEPOSIT_MODAL,
    modal: _modalData,
  }
}

export function changeDepositModal(_modalData) {
  return {
    type: CHANGE_DEPOSIT_MODAL,
    modal: _modalData,
  }
}
