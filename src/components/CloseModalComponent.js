import React from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { Lumino } from "@rsksmart/lumino-light-client-sdk";
import { showInfo } from "../utils";
import {notifierEndpoints} from "../constants/app";

const CloseModalComponent = props => {
  const { isOpen, toggle, partner, channelId, tokenName } = props;

  const closeChannel = async () => {
    const lumino = Lumino.get();
    const params = {
      partner: props.partner,
      tokenAddress: props.tokenAddress,
      address: props.address,
      tokenNetworkAddress: props.tokenNetworkAddress,
      channelIdentifier: props.channelId
    };
    const message = `Requesting to close channel `;
    showInfo(message);

    lumino.actions.closeChannel(params);

    for (let notifierEndpoint of notifierEndpoints) {
      await lumino.actions.subscribeToPartnerClosesSpecificChannel(
          notifierEndpoint,
          props.channelId,
          props.tokenNetworkAddress
      );
    }

    toggle();
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Close channel</ModalHeader>
        <ModalBody>
          <div>
            Close the channel {channelId} with partner {partner} on Token{" "}
            {tokenName}?
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" className="px-4" onClick={toggle}>
            CANCEL
          </Button>
          <Button color="danger" className="px-4" onClick={closeChannel}>
            CLOSE
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CloseModalComponent;
