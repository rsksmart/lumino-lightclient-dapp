// Set callbacks
import { Lumino } from "@rsksmart/lumino-light-client-sdk";
import { showInfo, showSuccess } from "../utils";
import { toEth } from "../utils";
import { CALLBACKS } from "@rsksmart/lumino-light-client-sdk/src/utils/callbacks";
import {notifierEndpoints} from "../constants/app";

const setCallbacks = reloadChannelsFN => {
  Lumino.callbacks.set(CALLBACKS.RECEIVED_PAYMENT, () => {
    showInfo("Received a payment, now processing it...");
  });

  Lumino.callbacks.set(CALLBACKS.COMPLETED_PAYMENT, payment => {
    const {
      amount,
      partner: p,
      channelId: ch,
      tokenName,
      isReceived
    } = payment;
    const am = toEth(String(amount));

    let message = `Successfully sent ${am} ${tokenName} to ${p} in channel ${ch}!`;
    if (isReceived)
      message = `Successfully received ${am} ${tokenName} from ${p} in channel ${ch} !`;

    showSuccess(message);
    reloadChannelsFN();
  });

  Lumino.callbacks.set(CALLBACKS.FAILED_CREATE_PAYMENT, (p, err) => {
    console.log("payment", p);
    console.log("err", err);
  });

  Lumino.callbacks.set(CALLBACKS.SENT_PAYMENT, p => {
    console.log("payment", p);
  });

  Lumino.callbacks.set(CALLBACKS.OPEN_CHANNEL, channel => {
    const {
      channel_identifier: chId,
      partner_address: p,
      token_name,
      token_network_identifier
    } = channel;
    const message = `Opened new channel ${chId} with partner ${p} on token ${token_name}`;
    showSuccess(message);
    reloadChannelsFN();
    for (let notifierEndpoint of notifierEndpoints) {
      Lumino.get().actions.subscribeToPartnerClosesSpecificChannel(
          notifierEndpoint,
          chId,
          token_network_identifier
      );
    }
  });

  Lumino.callbacks.set(CALLBACKS.DEPOSIT_CHANNEL, channel => {
    const {
      channel_identifier: chId,
      partner_address: p,
      token_name
    } = channel;
    const message = `New deposit on channel ${chId} with partner ${p} on token ${token_name}`;
    showSuccess(message);
    reloadChannelsFN();
  });

  Lumino.callbacks.set(CALLBACKS.REQUEST_CLIENT_ONBOARDING, address => {
    showInfo(`Requested Client onboarding with address ${address}`);
  });

  Lumino.callbacks.set(CALLBACKS.CLIENT_ONBOARDING_SUCCESS, address => {
    showSuccess(`Client onboarding with address ${address} was successful!`);
  });

  Lumino.callbacks.set(CALLBACKS.CLOSE_CHANNEL, channel => {
    const { channel_identifier, token_name } = channel;
    showSuccess(
      `Channel ${channel_identifier} on token ${token_name} close was successful!`
    );
    reloadChannelsFN();
  });

  Lumino.callbacks.set(CALLBACKS.REQUEST_OPEN_CHANNEL, ch =>
    console.log("Req open", ch)
  );
  Lumino.callbacks.set(CALLBACKS.REQUEST_CLOSE_CHANNEL, ch =>
    console.log("Req close", ch)
  );
  Lumino.callbacks.set(CALLBACKS.REQUEST_DEPOSIT_CHANNEL, ch =>
    console.log("Req Deposit", ch)
  );

  Lumino.callbacks.set(CALLBACKS.FAILED_PAYMENT, p =>
    console.log("Failed payment cb", p)
  );

  Lumino.callbacks.set(CALLBACKS.FAILED_CLOSE_CHANNEL, (ch, e) =>
    console.log("Failed close", ch, e)
  );

  Lumino.callbacks.set(CALLBACKS.FAILED_DEPOSIT_CHANNEL, (ch, e) =>
    console.log("Failed DEPOSIT", ch, e)
  );

  Lumino.callbacks.set(CALLBACKS.FAILED_OPEN_CHANNEL, (ch, e) =>
    console.log("Failed OPEN", ch, e)
  );

  Lumino.callbacks.set(CALLBACKS.FAILED_PAYMENT, p =>
    console.log("Failed payment", p)
  );
};

export default setCallbacks;
