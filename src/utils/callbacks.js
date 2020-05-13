// // Set callbacks
import { Lumino } from "@rsksmart/lumino-light-client-sdk";
import { showInfo, showSuccess } from "../utils";
import { toEth } from "../utils";

const setCallbacks = (reloadChannelsFN) => {
  Lumino.callbacks.set.setOnCompletedPaymentCallback((payment) => {
    const {
      amount,
      partner: p,
      channelId: ch,
      tokenName,
      isReceived,
    } = payment;
    const am = toEth(String(amount));
    let message = `Successfully sent ${am} ${tokenName} to ${p} in channel ${ch}!`;
    if (isReceived)
      message = `Successfully received ${am} ${tokenName} from ${p} in channel ${ch} !`;
    showSuccess(message);
    reloadChannelsFN();
  });

  Lumino.callbacks.set.setOnReceivedPaymentCallback(({ payment }) =>
    showInfo(
      `Receiving a payment of ${toEth(String(payment.amount))} ${
        payment.tokenName
      } from ${payment.initiator}`
    )
  );

  Lumino.callbacks.set.setOnOpenChannelCallback((channel) => {
    const {
      channel_identifier: chId,
      partner_address: p,
      token_name,
    } = channel;
    const message = `Opened new channel ${chId} with partner ${p} on token ${token_name}`;
    showSuccess(message);
    reloadChannelsFN();
  });

  Lumino.callbacks.set.setOnChannelDepositCallback((channel) => {
    const { channel_identifier: chId, partner_address: p } = channel;
    const message = `New deposit on channel ${chId} with partner ${p}`;
    showSuccess(message);
    reloadChannelsFN();
  });

  Lumino.callbacks.set.setOnRequestClientOnboarding((address) =>
    showInfo(`Requested Client onboarding with address ${address}`)
  );
  Lumino.callbacks.set.setOnClientOnboardingSuccess((address) =>
    showSuccess(`Client onboarding with address ${address} was successful!`)
  );
};

export default setCallbacks;
