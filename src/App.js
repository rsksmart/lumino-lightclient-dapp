import React from "react";
import "./App.css";
import { connect } from "react-redux";

import ChannelListItemComponent from "./components/ChannelListItemComponent";

import { Button } from "reactstrap";

import { Lumino } from "@rsksmart/lumino-light-client-sdk";

import { makeStartup, changeOpenChannelStatus } from "./actions/global";

import { channelsLoaded } from "./actions/channel";

import OpenChannelModalComponent from "./components/OpenChannelModalComponent";
import SendTokensModal from "./components/SendTokensModal";

class App extends React.Component {
  state = {
    showSendTokens: false,
  };

  componentDidMount = async () => {
    this.props.makeStartup();
  };

  subscribeToNotifier = async() =>{
    await Lumino.get().actions.notifierRegistration();
    await Lumino.get().actions.subscribeToOpenChannel()
  };

  onboarding = async () => {
    await Lumino.get().actions.onboardingClient();


  };

  openChannel = async () => {
    this.props.openChannelModal(true);
  };

  toggleShowSendTokens = () => {
    const { showSendTokens } = this.state;

    return this.setState({ showSendTokens: !showSendTokens });
  };

  render = () => {
    const { showSendTokens } = this.state;
    return (
      <div className="App d-flex h-100 flex-column">
        <div className="bg-page" />
        <header className="p-3 position-relative z-2 d-flex align-items-center flex-column flex-lg-row">
          <svg width="100" height="46" viewBox="0 0 100 46">
            <g fill="#fff" fillRule="nonzero" stroke="none" strokeWidth="1">
              <path
                d="M10.845 15.797h10.268a.124.124 0 00.115-.116v-3.32a.124.124 0 00-.115-.115H10.845a.124.124 0 00-.116.115v3.32c0 .077.058.116.116.116zm6.948-6.085h3.32a.124.124 0 00.115-.115v-3.32a.124.124 0 00-.115-.116h-3.32a.124.124 0 00-.115.115v3.32c0 .059.057.116.115.116zM3.589 24.434H.27a.124.124 0 00-.115.115v3.32c0 .058.057.116.115.116h3.32a.124.124 0 00.115-.116v-3.32a.124.124 0 00-.115-.115zm12.188 0h-3.32a.124.124 0 00-.115.115v10.269c0 .057.057.115.115.115h3.32a.124.124 0 00.116-.115v-10.27a.124.124 0 00-.116-.114zm20.307-3.32h3.321a.124.124 0 00.115-.116v-3.32a.124.124 0 00-.115-.116h-3.32a.124.124 0 00-.116.116v3.32c0 .077.039.115.115.115zm-6.103 0h3.32a.124.124 0 00.116-.116V10.73a.124.124 0 00-.116-.115h-3.32a.124.124 0 00-.115.115V21c0 .076.057.114.115.114zM17.793 3.607h3.32a.124.124 0 00.115-.115V.173a.124.124 0 00-.115-.115h-3.32a.124.124 0 00-.115.115v3.32c0 .077.057.115.115.115zm-8.1 20.826h-3.32a.124.124 0 00-.116.115v3.32c0 .058.058.116.115.116h3.32a.124.124 0 00.116-.116v-3.32c-.02-.058-.058-.115-.115-.115zm25.24 5.336H24.664a.124.124 0 00-.115.115v3.32c0 .058.058.116.115.116h10.269a.124.124 0 00.115-.116v-3.32c-.02-.077-.058-.115-.115-.115zm7.006-6.046h-14.55a.124.124 0 00-.115.115v3.224c0 .058.058.116.116.116h14.549a.124.124 0 00.115-.116V23.84c0-.077-.058-.115-.115-.115zm-13.974 12.13h-3.32a.124.124 0 00-.115.115v3.32c0 .058.057.116.115.116h3.32a.124.124 0 00.116-.115v-3.32c0-.058-.039-.116-.116-.116zm-9.481-17.351a.124.124 0 00-.115-.115H3.819a.124.124 0 00-.115.115v3.224c0 .058.058.116.116.116h14.549a.124.124 0 00.115-.116v-3.224zm27.005-.921h-3.32a.124.124 0 00-.115.115v3.32c0 .058.057.115.115.115h3.32a.124.124 0 00.116-.115v-3.32c0-.077-.039-.115-.116-.115zm-23.666 9.597H18.6a.124.124 0 00-.115.115v14.549c0 .057.057.115.115.115h3.224a.124.124 0 00.116-.115v-14.55a.124.124 0 00-.116-.114zm5.451-8.887V3.724a.124.124 0 00-.115-.116h-3.224a.124.124 0 00-.115.116v14.568c0 .057.057.115.115.115h3.224a.124.124 0 00.115-.115zm.691 23.666h-3.32a.124.124 0 00-.115.115v3.32c0 .058.057.116.115.116h3.32a.124.124 0 00.116-.116v-3.32c0-.077-.039-.115-.116-.115zM66.583 17.562h-5.105c-5.509 0-8.676 3.916-8.676 9.367l-.038 18.292c0 .153.134.288.288.288h6.372a.295.295 0 00.288-.288l-.211-18.1c0-2.246 1.248-3.474 3.532-3.474h3.55a.295.295 0 00.288-.288V17.85a.295.295 0 00-.288-.288zm12.592.173h-6.373a.295.295 0 00-.288.288v27.198c0 .153.135.288.288.288h6.373a.295.295 0 00.288-.288V18.004c0-.154-.116-.269-.288-.269zm.172-11.708H72.63a.124.124 0 00-.116.115v6.718c0 .057.058.115.116.115h6.717a.124.124 0 00.116-.115V6.142c0-.077-.039-.115-.116-.115zm20.615 12.36a.295.295 0 00-.288-.287h-7.102v-2.783c0-2.246 1.248-3.474 3.532-3.474h3.512a.295.295 0 00.288-.288V6.046a.295.295 0 00-.288-.288H94.55c-5.509 0-8.676 3.916-8.676 9.367l-.038 30.096c0 .153.134.288.288.288h6.372a.295.295 0 00.288-.288V24.069h6.89a.295.295 0 00.289-.288v-5.393z"
                transform="translate(-15 -22) translate(15 22)"
              />
            </g>
          </svg>
          <ul className="list-unstyled text-center buttons-list ml-lg-auto d-flex mb-0 mt-3 mt-lg-0">
            <li className="mx-2">
              <Button onClick={this.onboarding}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  data-icon="plus"
                  data-prefix="fal"
                  viewBox="0 0 384 512"
                  width={15}
                >
                  <path
                    fill="#ffffff"
                    d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"
                  />
                </svg>
                Onboarding
              </Button>
            </li>
            <li className="mx-2">
              <Button onClick={this.subscribeToNotifier}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  data-icon="plus"
                  data-prefix="fal"
                  viewBox="0 0 384 512"
                  width={15}
                >
                  <path
                    fill="#ffffff"
                    d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"
                  />
                </svg>
                Subscribe to notifier
              </Button>
            </li>
            <li className="mx-2">
              <Button onClick={this.openChannel}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  data-icon="chart-network"
                  data-prefix="fal"
                  viewBox="0 0 640 512"
                  width={20}
                >
                  <path
                    fill="#ffffff"
                    d="M513.6 202.8l-19.2-25.6-48 36 19.2 25.6 48-36zM576 192c13.3 0 25.6-4 35.8-10.9 6.8-4.6 12.7-10.5 17.3-17.3C636 153.6 640 141.3 640 128c0-13.3-4-25.6-10.9-35.8-2.3-3.4-4.9-6.6-7.8-9.5-2.9-2.9-6.1-5.5-9.5-7.8C601.6 68 589.3 64 576 64s-25.6 4-35.8 10.9c-6.8 4.6-12.7 10.5-17.3 17.3C516 102.4 512 114.7 512 128c0 35.3 28.7 64 64 64zm0-96c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zM99.8 250.9C89.6 244 77.3 240 64 240s-25.6 4-35.8 10.9c-6.8 4.6-12.7 10.5-17.3 17.3C4 278.4 0 290.7 0 304c0 35.3 28.7 64 64 64s64-28.7 64-64c0-13.3-4-25.6-10.9-35.8-4.6-6.8-10.5-12.7-17.3-17.3zM64 336c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32zm88-16h48v-32h-48v32zm469.3 82.7c-2.9-2.9-6.1-5.5-9.5-7.8C601.6 388 589.3 384 576 384s-25.6 4-35.8 10.9c-3.3 2.2-6.3 4.7-9.1 7.5l-91.8-55.1c5.6-13.3 8.7-28 8.7-43.3 0-61.9-50.1-112-112-112-11.3 0-21.9 2.2-32.2 5.2l-39.3-84.1C278.8 101.4 288 83.9 288 64c0-13.3-4-25.6-10.9-35.8-4.6-6.8-10.5-12.7-17.3-17.3C249.6 4 237.3 0 224 0s-25.6 4-35.8 10.9c-6.8 4.6-12.7 10.5-17.3 17.3C164 38.4 160 50.7 160 64c0 35.3 28.7 64 64 64 4 0 7.9-.5 11.7-1.2l39 83.6c-30.5 20-50.7 54.4-50.7 93.6 0 61.9 50.1 112 112 112 35 0 65.8-16.4 86.4-41.5l92.4 55.4c-1.7 5.8-2.7 11.8-2.7 18.1 0 35.3 28.7 64 64 64 13.3 0 25.6-4 35.8-10.9 6.8-4.6 12.7-10.5 17.3-17.3C636 473.6 640 461.3 640 448c0-13.3-4-25.6-10.9-35.8-2.3-3.4-5-6.6-7.8-9.5zM224 96c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32zm112 288c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80zm240 96c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32z"
                  />
                </svg>
                Open Channel
              </Button>
            </li>
            <li className="mx-2">
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  data-icon="sync"
                  data-prefix="fal"
                  viewBox="0 0 512 512"
                  width={15}
                >
                  <path
                    fill="#ffffff"
                    d="M492 8h-10c-6.627 0-12 5.373-12 12v110.627C426.929 57.261 347.224 8 256 8 123.228 8 14.824 112.338 8.31 243.493 7.971 250.311 13.475 256 20.301 256h10.016c6.353 0 11.646-4.949 11.977-11.293C48.157 132.216 141.097 42 256 42c82.862 0 154.737 47.077 190.289 116H332c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h160c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12zm-.301 248h-10.015c-6.352 0-11.647 4.949-11.977 11.293C463.841 380.158 370.546 470 256 470c-82.608 0-154.672-46.952-190.299-116H180c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H20c-6.627 0-12 5.373-12 12v160c0 6.627 5.373 12 12 12h10c6.627 0 12-5.373 12-12V381.373C85.071 454.739 164.777 504 256 504c132.773 0 241.176-104.338 247.69-235.493.339-6.818-5.165-12.507-11.991-12.507z"
                  />
                </svg>
                Refresh Channels
              </Button>
            </li>
            <li className="mx-2">
              <Button onClick={this.toggleShowSendTokens}>Send Tokens</Button>
            </li>
          </ul>
        </header>

        <ul className="list-unstyled p-3 channel-list z-2 mt-auto">
          {Object.values(this.props.channels).map((channel, index) => {
            return (
              <ChannelListItemComponent
                key={index}
                tokenName={channel.token_name || "???"}
                tokenSymbol={channel.token_symbol || "???"}
                partner={channel.partner_address}
                balance={channel.offChainBalance}
                status={channel.sdk_status}
                tokenAddress={channel.token_address}
                tokenNetworkAddress={channel.token_network_identifier}
                channelId={channel.channel_identifier}
              />
            );
          })}
        </ul>
        <SendTokensModal
          toggleModal={this.toggleShowSendTokens}
          open={showSendTokens}
        />
        <OpenChannelModalComponent />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    channels: state.channel.list,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    makeStartup: () => {
      dispatch(makeStartup());
    },
    loadChannels: (channels) => dispatch(channelsLoaded(channels)),
    openChannelModal: (status) => dispatch(changeOpenChannelStatus(status)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
