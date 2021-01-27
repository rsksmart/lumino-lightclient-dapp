import {
  STARTUP_FINISH,
  MAKE_STARTUP,
  CHANGE_OPEN_CHANNEL_MODAL,
  PAYMENT_RECEIVED
} from "../constants/action-types";

export function startupFinish(_web3) {
  return {
    type: STARTUP_FINISH,
    web3: _web3,
    initialized: true
  };
}

export function makeStartup() {
  return {
    type: MAKE_STARTUP
  };
}

export function changeOpenChannelStatus(_newStatus) {
  return {
    type: CHANGE_OPEN_CHANNEL_MODAL,
    newStatus: _newStatus
  };
}

export function paymentReceived(_payment) {
  return {
    type: PAYMENT_RECEIVED,
    payment: _payment
  };
}
