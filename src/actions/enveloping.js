import {
  LOAD_SMART_WALLETS, RELAY_TRANSACTION,
  STORE_SMART_WALLET, SWITCH_DEPLOY_SMART_WALLET_MODAL,
  SWITCH_ENVELOPMENT, SWITCH_RELAY_TRANSACTION_MODAL,
  SWITCH_SMART_WALLET_MODAL,
} from '../constants/action-types'

export function switchSmartWalletModal() {
  return {
    type: SWITCH_SMART_WALLET_MODAL
  }
}

export function switchDeploySmartWalletModal(wallet) {
  return {
    type: SWITCH_DEPLOY_SMART_WALLET_MODAL,
    wallet
  }
}

export function storeSmartWallet(wallet) {
  return {
    type: STORE_SMART_WALLET,
    wallet,
  }
}

export function loadSmartWallets(wallets) {
  return {
    type: LOAD_SMART_WALLETS,
    wallets: wallets
  }
}

export function switchEnvelopingStatus() {
  return {
    type: SWITCH_ENVELOPMENT
  }
}

export function switchRelayTransactionModal() {
  return {
    type: SWITCH_RELAY_TRANSACTION_MODAL
  }
}

export function relayEnvelopingTransaction(transaction) {
  return {
    type: RELAY_TRANSACTION,
    relayTransaction: transaction
  }
}