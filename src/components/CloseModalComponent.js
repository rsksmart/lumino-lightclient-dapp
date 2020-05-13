import React from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { Lumino } from "@rsksmart/lumino-light-client-sdk";
import { showInfo } from "../utils";

const CloseModalComponent = (props) => {
  const { isOpen, toggle, partner, channelId, tokenName } = props;

  const closeChannel = async () => {
    const params = {
      partner: props.partner,
      tokenAddress: props.tokenAddress,
      address: props.address,
      tokenNetworkAddress: props.tokenNetworkAddress,
      channel_identifier: props.channelId,
    };
    const message = `Requesting to close channel `;
    showInfo(message);
    Lumino.get().actions.closeChannel(params);
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
