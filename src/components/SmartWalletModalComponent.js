import React from "react";
import {connect} from "react-redux";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Lumino} from "@rsksmart/lumino-light-client-sdk";
import {loadSmartWallets, switchDeploySmartWalletModal, switchSmartWalletModal} from "../actions/enveloping";

class SmartWalletModalComponent extends React.Component {

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

  createWallet = async () => {
    await Lumino.get().actions.generateSmartWalletAddress(Object.keys(this.props.wallets).length);
    const wallets = await Lumino.get().actions.getSmartWallets();
    await this.props.loadWallets(wallets);
  }

  deployWallet = async (wallet) => {
    this.props.openDeployModal(wallet);
  }

  getWalletItems() {
    const {wallets} = this.props;
    if (!wallets || Object.keys(wallets).length <= 0) {
      return (<div><ul className="list-unstyled"><li key="no-items">No wallets created yet.</li></ul></div>);
    }
    return (
        <div>
          <ul className="list-unstyled">
            {Object.keys(wallets).map(address => {
              const wallet = wallets[address];
              const deployButton = wallet.deployed ?
                  (<Button color="secondary" className="disbled">
                    Deployed
                  </Button>) : (<Button color="primary" className="px-4" onClick={() => this.deployWallet(wallet)}>
                    Deploy
                  </Button>);
              return (<li key={address} className="d-flex justify-content-between m-2"><span>{wallet.address}</span><span>{deployButton}</span></li>);
            })}
          </ul>
        </div>
    );
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modalOpened} toggle={this.toggle} centered size="lg">
          <ModalHeader toggle={this.toggle}>SmartWallets</ModalHeader>
          <ModalBody>
            {this.getWalletItems()}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" className="px-4" onClick={this.cancel}>
              CLOSE
            </Button>
            <Button color="primary" className="px-4" onClick={this.createWallet}>
              CREATE WALLET
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalOpened: state.enveloping.openedSmartWalletModal,
    wallets: state.enveloping.wallets
  };
};

function mapDispatchToProps(dispatch) {
  return {
    toggle: () => dispatch(switchSmartWalletModal()),
    loadWallets: wallets => dispatch(loadSmartWallets(wallets)),
    openDeployModal: wallet => dispatch(switchDeploySmartWalletModal(wallet))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SmartWalletModalComponent);
