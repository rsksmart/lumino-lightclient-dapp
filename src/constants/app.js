export const address = process.env.REACT_APP_ADDRESS;
export const chainId = process.env.REACT_APP_CHAIN_ID;
export const PrivateKey = process.env.REACT_APP_PRIVATE_KEY;
export const rskEndpoint = process.env.REACT_APP_RSK_ENDPOINT;
export const hubEndpoint = process.env.REACT_APP_HUB_ENDPOINT;
export const registryAddress = process.env.REACT_APP_RNS_REGISTRY_CONTRACT_ADDRESS;
export const tokenNetworkAddresses = getListFromString(process.env.REACT_APP_TOKEN_NETWORK_ADDRESSES);
export const notifierEndpoints = getListFromString(process.env.REACT_APP_NOTIFIER_ENDPOINTS);
// Enveloping
export const relayVerifierContractAddress = process.env.REACT_APP_RELAY_VERIFIER_CONTRACT_ADDRESS;
export const deployVerifierContractAddress = process.env.REACT_APP_DEPLOY_VERIFIER_CONTRACT_ADDRESS;
export const relayHubContractAddress = process.env.REACT_APP_RELAY_HUB_CONTRACT_ADDRESS;
export const smartWalletFactoryContractAddress = process.env.REACT_APP_SMART_WALLET_FACTORY_CONTRACT_ADDRESS;
export const preferredRelays = getListFromString(process.env.REACT_APP_PREFERRED_RELAYS);

function getListFromString (environmentVariable, splitter = ',') {
    if (!environmentVariable) {
        return [];
    }
    return environmentVariable.split(splitter);
}
