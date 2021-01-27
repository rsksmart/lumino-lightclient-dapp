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

import { changePayModal } from "../actions/channel";

import { Lumino } from "@rsksmart/lumino-light-client-sdk";
import { toWei, showInfo } from "../utils";

class PayModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      tokenAddress: "",
      partner: ""
    };
  }

  pay = async () => {
    const { amount, partner, tokenAddress } = this.state;
    const { toggleModal } = this.props;
    const amountWei = toWei(amount);
    const body = {
      partner: partner,
      token_address: tokenAddress,
      amount: amountWei
    };
    const message = `Sending payment of ${amount}  to ${partner} `;
    showInfo(message);
    toggleModal();
    await Lumino.get().actions.createPayment(body);
  };

  handleChange = event => {
    this.setState({ amount: event.target.value });
  };

  handleTokenAddressChange = ({ target: { value } }) =>
    this.setState({ tokenAddress: value });

  handlePartnerChange = ({ target: { value } }) =>
    this.setState({ partner: value });

  render() {
    const { open, toggleModal } = this.props;

    return (
      <div>
        <Modal isOpen={open} toggle={toggleModal} centered>
          <ModalHeader toggle={toggleModal}>Send Tokens</ModalHeader>
          <ModalBody>
            <div>
              <p className="fw-600 m-0">Your are going to pay to:</p>
              <Input
                type="text"
                name="partner"
                id="partner"
                placeholder="Partner Address"
                onChange={this.handlePartnerChange}
              />
            </div>
            <div className="mt-2">
              <span className="fw-600 m-0">Token Address</span>{" "}
              <Input
                type="text"
                name="tokenAddress"
                id="tokenAddress"
                placeholder="Token Address"
                onChange={this.handleTokenAddressChange}
              />
            </div>
            <div className="mt-2">
              <span className="fw-600">Please fill the amount:</span>
              <Input
                type="text"
                name="amount"
                id="tokenPaymentAmount"
                placeholder="Amount"
                onChange={this.handleChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" className="px-4" onClick={toggleModal}>
              CANCEL
            </Button>
            <Button color="primary" className="px-4" onClick={this.pay}>
              PAY!
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalOpened: state.channel.openedPayModal
  };
};

function mapDispatchToProps(dispatch) {
  return {
    toggle: data => dispatch(changePayModal(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PayModalComponent);
