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
        // const lumino = Lumino.get();

        //Notifier registration
        // const notifier1 = "http://127.0.0.1:8080";
        // const notifier2 = "http://127.0.0.1:8081";
        // const notifier3 = "http://127.0.0.1:8082";
        // const tokenNetworkAddr = "0x2Cc72d80C88F58baFBA82bEC2eD275F56792de02";

        // await lumino.actions.notifierRegistration(notifier1);
        // await lumino.actions.notifierRegistration(notifier2);
        // await lumino.actions.notifierRegistration(notifier3);

        // await lumino.actions.subscribeToOpenChannel(notifier1);
        // await lumino.actions.subscribeToOpenChannel(notifier2);
        // await lumino.actions.subscribeToOpenChannel(notifier3);

        // await lumino.actions.subscribeToPartnerClosesSpecificChannel(
        //   notifier1,
        //   20,
        //   tokenNetworkAddr
        // );

        // await lumino.actions.subscribeToUserClosesChannelOnToken(
        //   notifier1,
        //   tokenNetworkAddr
        // );
      })();
    }
  })
];
