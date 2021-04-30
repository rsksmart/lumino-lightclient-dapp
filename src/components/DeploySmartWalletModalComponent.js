import React from "react";
import {connect} from "react-redux";

import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

import {Lumino} from "@rsksmart/lumino-light-client-sdk";
import {loadSmartWallets, switchDeploySmartWalletModal} from "../actions/enveloping";
import {showError} from "../utils";

class DeploySmartWalletModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tokenAddress: "",
            amount: ""
        };
    }

    deploy = async () => {
        const {amount, tokenAddress} = this.state;
        const {wallet} = this.props;
        try {
            await Lumino.get().actions.deploySmartWallet(wallet.address, wallet.index, tokenAddress, amount);
        } catch (error) {
            showError(error);
        }
        this.toggle();
    };

    cancel = () => {
        this.props.toggle();
    };

    toggle = () => {
        this.props.toggle();
    };

    handleChange = event => {
        this.setState({amount: event.target.value});
    };

    handleTokenChange = event => {
        this.setState({ tokenAddress: event.target.value });
    };

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modalOpened} toggle={this.toggle} centered>
                    <ModalHeader toggle={this.toggle}>
                        Deploy Smart Wallet
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <p className="fw-600 m-0">Your are going to deploy the smart wallet:</p>
                            {this.props.wallet.address}
                        </div>
                        <div>
                            <span className="fw-600">Smart Wallet Token:</span>
                            <Input
                                type="text"
                                name="tokenAddress"
                                id="tokenAddress"
                                placeholder="Token address"
                                onChange={this.handleTokenChange}
                            />
                        </div>
                        <div className="mt-2">
                            <span className="fw-600">Token Amount for Smart Wallet:</span>
                            <Input
                                type="text"
                                name="amount"
                                id="depositAmount"
                                placeholder="Amount"
                                onChange={this.handleChange}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" className="px-4" onClick={this.cancel}>
                            CANCEL
                        </Button>
                        <Button color="primary" className="px-4" onClick={this.deploy}>
                            DEPLOY
                        </Button>{" "}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        modalOpened: state.enveloping.openedSmartWalletModal,
        wallet: state.enveloping.selectedForDeploy
    };
};

function mapDispatchToProps(dispatch) {
    return {
        toggle: () => dispatch(switchDeploySmartWalletModal()),
        loadWallets: wallets => dispatch(loadSmartWallets(wallets)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeploySmartWalletModalComponent);
