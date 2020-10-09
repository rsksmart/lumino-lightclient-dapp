import React from "react";
import { connect } from "react-redux";

import { channelStatus } from "../constants/channel-status";

import "./ChannelListItemComponent.css";

import { Button } from "reactstrap";

import { openPayModal, openDepositModal } from "../actions/channel";

import PayModalComponent from "./PayModalComponent";
import DepositModalComponent from "./DepositModalComponent";
import { toEth } from "../utils";
import CloseModalComponent from "./CloseModalComponent";
import { address } from "../constants/app";

class ChannelListItemComponent extends React.Component {
  state = {
    openClose: false
  };
  deposit = async () => {
    let modalId = this.props.tokenAddress + "-" + this.props.partner;
    this.props.openDepositModal(modalId);
  };

  pay = async () => {
    let modalId = this.props.tokenAddress + "-" + this.props.partner;
    this.props.openPayModal(modalId);
  };

  toggleClose = () => {
    const { openClose } = this.state;
    this.setState({ openClose: !openClose });
  };

  getSdkStatusName(status) {
    const statusName = channelStatus[status];
    if (!statusName) {
      return status;
    }
    return statusName;
  }

  getButtons (status) {
    return this.props.initialized && status && status === "CHANNEL_OPENED" ? (
        <li className="ml-lg-auto mt-3 mt-lg-0">
          <Button color="info" className="mx-2" onClick={this.deposit}>
            Deposit
          </Button>
          <Button color="success" className="mx-2" onClick={this.pay}>
            Pay
          </Button>
          <Button color="danger" className="mx-2" onClick={this.toggleClose}>
            Close
          </Button>
        </li>
    ) : null;
  }

  render() {
    const { status, partner, tokenAddress, balance, tokenName } = this.props;
    let statusName = this.getSdkStatusName(status);
    const buttons = this.getButtons(status);
    let modalId = tokenAddress + "-" + partner;
    const { openClose } = this.state;
    return (
      <div className="ChannelListItemComponent d-lg-flex align-items-center rounded bg-white p-2 shadow-sm mb-3">
        <ul className="list-unstyled">
          <li id="partner">
            <span className="fw-600">Partner:</span> {partner}
          </li>
          <li id="token-address">
            <span className="fw-600">Token address:</span> {tokenAddress}
          </li>
          <li id="token-address">
            <span className="fw-600">Channel ID: </span>
            {this.props.channelId}
          </li>
          <li id="partner">
            <span className="fw-600">Token Name: </span>
            {tokenName}
          </li>
        </ul>
        <li className="mx-lg-auto">
          <span className="mx-2">
            <span className="fw-600">Balance:</span> {toEth(balance)}
          </span>
          <span className="mx-2">
            <span className="fw-600">Status:</span> {statusName}
          </span>
        </li>
        {buttons}
        <PayModalComponent
          tokenName={tokenName}
          modalId={modalId}
          partner={partner}
          tokenAddress={tokenAddress}
        />
        <DepositModalComponent
          tokenName={tokenName}
          modalId={modalId}
          partner={partner}
          tokenAddress={tokenAddress}
          tokenNetworkAddress={this.props.tokenNetworkAddress}
          channelId={this.props.channelId}
        />
        <CloseModalComponent
          id={this.props.channelId}
          toggle={this.toggleClose}
          isOpen={openClose}
          partner={partner}
          tokenName={tokenName}
          tokenAddress={tokenAddress}
          address={address}
          tokenNetworkAddress={this.props.tokenNetworkAddress}
          channelId={this.props.channelId}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      initialized: state.global.initialized
  };
};

function mapDispatchToProps(dispatch) {
  return {
    openDepositModal: data => dispatch(openDepositModal(data)),
    openPayModal: data => dispatch(openPayModal(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelListItemComponent);
