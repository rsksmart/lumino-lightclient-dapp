import React from "react";
import { connect } from "react-redux";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";

import { changeOpenChannelStatus } from "../actions/global";

import { channelsLoaded } from "../actions/channel";

import { Lumino } from "@rsksmart/lumino-light-client-sdk";
import { showInfo } from "../utils";
import {relayEnvelopingTransaction} from "../actions/enveloping";

class OpenChannelModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partner: "",
      tokenAddress: ""
    };
  }

  open = async () => {
    const { partner, tokenAddress } = this.state;
    const params = {
      partner,
      settleTimeout: 500,
      tokenAddress
    };
    if (this.props.usingEnveloping) {
      const openChannelTransaction = async (wallet, tokenAddress, tokenAmount) => {
        const message = `Request to open a channel with partner ${partner} on token ${tokenAddress}`;
        showInfo(message);
        this.props.toggle();
        params.enveloping = {
          smartWalletAddress: wallet.address,
          tokenAmount,
          tokenAddress
        };
        await Lumino.get().actions.openChannel(params);
      };
      await this.props.relayTransaction(openChannelTransaction);
    } else {
        const message = `Request to open a channel with partner ${partner} on token ${tokenAddress}`;
        showInfo(message);
        this.props.toggle(null);
        await Lumino.get().actions.openChannel(params);
    }
  };

  cancel = () => {
    this.props.toggle(null);
  };

  toggle = () => {
    this.props.toggle(!this.props.modalOpened);
  };

  handlePartnerChange = event => {
    this.setState({ partner: event.target.value });
  };

  handleTokenChange = event => {
    this.setState({ tokenAddress: event.target.value });
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modalOpened} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>Open a new channel</ModalHeader>
          <ModalBody>
            <div>
              <span className="fw-600">Token:</span>
              <Input
                type="text"
                name="tokenAddress"
                id="tokenAddress"
                placeholder="Token address"
                onChange={this.handleTokenChange}
              />
            </div>
            <div className="mt-2">
              <span className="fw-600">Partner:</span>
              <Input
                type="text"
                name="partnerAddress"
                id="partnerAddress"
                placeholder="Partner address"
                onChange={this.handlePartnerChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" className="px-4" onClick={this.cancel}>
              CANCEL
            </Button>
            <Button color="primary" className="px-4" onClick={this.open}>
              OPEN
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalOpened: state.global.openedOpenChannel,
    usingEnveloping: state.enveloping.usingEnveloping
  };
};

function mapDispatchToProps(dispatch) {
  return {
    toggle: data => dispatch(changeOpenChannelStatus(data)),
    loadChannels: channels => dispatch(channelsLoaded(channels)),
    relayTransaction: transaction => dispatch(relayEnvelopingTransaction(transaction))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenChannelModalComponent);
