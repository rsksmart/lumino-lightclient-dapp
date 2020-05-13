import Web3 from "web3";

export const toEth = amount => Web3.utils.fromWei(amount);

export const toWei = amount => Web3.utils.toWei(amount);
