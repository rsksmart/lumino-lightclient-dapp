import React from "react";
import {connect} from "react-redux";

import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

import {Lumino} from "@rsksmart/lumino-light-client-sdk";
import {loadSmartWallets, switchRelayTransactionModal} from "../actions/enveloping";
import {showError} from "../utils";

class RelayTransactionModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedWallet: null,
            tokenAddress: "",
            amount: ""
        };
    }

    componentDidMount = async () => {
        const wallets = await Lumino.get().actions.getSmartWallets();
        await this.props.loadWallets(wallets);
    }

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

    handleSelectedWallet = wallet => {
        this.setState({ selectedWallet: wallet, tokenAddress: wallet.tokenAddress });
    };

    relay = async () => {
        try {
            await this.props.relayTransaction(this.state.selectedWallet, this.state.tokenAddress, this.state.amount);
        } catch (error) {
            showError(error);
        }
        this.toggle();
    }

    render() {
        const wallets = this.props.wallets;
        return (
            <div>
                <Modal isOpen={this.props.modalOpened} toggle={this.toggle} centered size="lg">
                    <ModalHeader toggle={this.toggle}>
                        Relaying Transaction
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <p className="fw-600 m-0">Choose one of your wallets:</p>
                            <div>
                                <ul className="list-unstyled">
                                    {Object.keys(wallets).filter(address => wallets[address].deployed).map(address => {
                                        const selectedWallet = this.state.selectedWallet;
                                        const wallet = wallets[address];
                                        if (selectedWallet && wallet.address === selectedWallet.address) {
                                            const selectButton = (<Button color="primary" className="px-4">Selected</Button>);
                                            return (<li key={address} className="d-flex justify-content-between m-2"><span>{wallet.address}</span><span>{selectButton}</span></li>);
                                        }
                                        const selectButton = (<Button color="secondary" className="px-4" onClick={() => this.handleSelectedWallet(wallet)}>Select</Button>);
                                        return (<li key={address} className="d-flex justify-content-between m-2"><span>{wallet.address}</span><span>{selectButton}</span></li>);
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <span className="fw-600">Paying with token:</span>
                            <Input
                                type="text"
                                name="tokenAddress"
                                id="tokenAddress"
                                placeholder="Token address"
                                value={this.state.selectedWallet?.tokenAddress ? this.state.selectedWallet.tokenAddress: ''}
                                onChange={this.handleTokenChange}
                            />
                        </div>
                        <div className="mt-2">
                            <span className="fw-600">Amount to pay:</span>
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
                        <Button color="primary" className="px-4" onClick={this.relay}>
                            RELAY
                        </Button>{" "}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        modalOpened: state.enveloping.openedRelayTransactionModal,
        relayTransaction: state.enveloping.relayTransaction,
        wallets: state.enveloping.wallets
    };
};

function mapDispatchToProps(dispatch) {
    return {
        toggle: () => dispatch(switchRelayTransactionModal()),
        loadWallets: wallets => dispatch(loadSmartWallets(wallets)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RelayTransactionModalComponent);
