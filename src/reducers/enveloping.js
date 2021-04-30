import {
  LOAD_SMART_WALLETS,
  RELAY_TRANSACTION,
  STORE_SMART_WALLET,
  SWITCH_DEPLOY_SMART_WALLET_MODAL,
  SWITCH_ENVELOPMENT,
  SWITCH_RELAY_TRANSACTION_MODAL,
  SWITCH_SMART_WALLET_MODAL
} from '../constants/action-types'

const initialState = {
  wallets: {},
  openedSmartWalletModal: false,
  openedDeploySmartWalletModal: false,
  openedRelayTransactionModal: false,
  selectedForDeploy: null,
  usingEnveloping: false,
  relayTransaction: null
}
const enveloping = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SMART_WALLETS:
      return {
        ...state,
        wallets: action.wallets,
      };
    case STORE_SMART_WALLET:
      state.wallets[action.wallet.address] = action.wallet;
      return state;
    case SWITCH_SMART_WALLET_MODAL:
      return {
        ...state,
        openedSmartWalletModal: !state.openedSmartWalletModal,
      };
    case SWITCH_RELAY_TRANSACTION_MODAL:
      return {
        ...state,
        openedRelayTransactionModal: !state.openedRelayTransactionModal,
      };
    case SWITCH_DEPLOY_SMART_WALLET_MODAL:
      return {
        ...state,
        openedDeploySmartWalletModal: !state.openedDeploySmartWalletModal,
        selectedForDeploy: action.wallet
      };
    case SWITCH_ENVELOPMENT:
      return {
        ...state,
        usingEnveloping: !state.usingEnveloping,
      };
    case RELAY_TRANSACTION:
      return {
        ...state,
        relayTransaction: action.relayTransaction,
        openedRelayTransactionModal: true
      }
    default:
      return state;
  }
};

export default enveloping;
