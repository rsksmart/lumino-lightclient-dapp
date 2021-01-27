import { createLogic } from "redux-logic";
import Web3 from "web3";

import { MAKE_STARTUP } from "../constants/action-types";

import { startupFinish } from "../actions/global";

import { channelsLoaded } from "../actions/channel";

import {
  Lumino,
  LocalStorageHandler,
  SigningHandler
} from "@rsksmart/lumino-light-client-sdk";
import {
  address,
  hubEndpoint,
  rskEndpoint,
  chainId,
  PrivateKey,
  registryAddress
} from "../constants/app";
import setCallbacks from "../utils/callbacks";

export default [
  createLogic({
    type: MAKE_STARTUP,
    process({ getState, action }, dispatch, done) {
      (async () => {
        const configParams = {
          chainId,
          rskEndpoint,
          hubEndpoint,
          address,
          registryAddress
        };
        console.log("REGISTRY ADDRESS", configParams.registryAddress)
        const web3 = new Web3(rskEndpoint);
        const signingHandler = SigningHandler();
        signingHandler.init(web3, PrivateKey);

        await Lumino.init(signingHandler, LocalStorageHandler, configParams);

        const reloadChannels = () =>
          dispatch(channelsLoaded(Lumino.get().actions.getChannels()));

        reloadChannels();

        setCallbacks(reloadChannels);

        // Store web3
        dispatch(startupFinish(web3));
      })();
    }
  })
];
