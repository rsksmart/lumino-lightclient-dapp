// Set callbacks
import { Lumino } from "@rsksmart/lumino-light-client-sdk";
import {showError, showInfo, showSuccess} from "../utils";
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
    console.error("payment", p);
    console.error("err", err);
    showError("Error creating payment");
  });

  Lumino.callbacks.set(CALLBACKS.SENT_PAYMENT, p => {
    console.log("payment", p);
    showInfo("Payment Sent");
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
      Lumino.get().actions.subscribeToUserClosesChannelOnToken(notifierEndpoint, token_network_identifier);
      Lumino.get().actions.subscribeToPartnerClosesSpecificChannel(notifierEndpoint, chId, token_network_identifier);
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

  Lumino.callbacks.set(CALLBACKS.REQUEST_OPEN_CHANNEL, ch => {
    console.log("Req open", ch);
    showInfo("Requesting Open Channel");
  });
  Lumino.callbacks.set(CALLBACKS.REQUEST_CLOSE_CHANNEL, ch => {
    console.log("Req close", ch)
    showInfo("Requesting Close Channel");
  });
  Lumino.callbacks.set(CALLBACKS.REQUEST_DEPOSIT_CHANNEL, ch => {
    console.log("Req Deposit", ch);
    showInfo("Requesting Deposit Channel");
  });

  Lumino.callbacks.set(CALLBACKS.FAILED_PAYMENT, p => {
    console.error("Failed payment cb", p);
    showError("Payment failed");
  });

  Lumino.callbacks.set(CALLBACKS.FAILED_CLOSE_CHANNEL, (ch, e) => {
    console.error("Failed close", ch, e);
    showError("Failed closing channel");
  });

  Lumino.callbacks.set(CALLBACKS.FAILED_DEPOSIT_CHANNEL, (ch, e) => {
    console.error("Failed DEPOSIT", ch, e);
    showError(`Failed deposit channel: ${e}`);
  });

  Lumino.callbacks.set(CALLBACKS.FAILED_OPEN_CHANNEL, (ch, e) => {
    console.error("Failed OPEN", ch, e);
    showError(`Failed open channel: ${e}`);
  });

};

export default setCallbacks;
