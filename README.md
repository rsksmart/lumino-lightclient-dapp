
# Lumino Light Client DApp

This project is an example DApp that uses  [Lumino light client sdk](https://github.com/rsksmart/lumino-light-client-sdk) to interact with a [Lumino hub](https://github.com/rsksmart/lumino) in order to:

- Create payment channels
- Make payments
- Receive payments

## Initial setup

This web application represents a Lumino light client, therefore, it must connect with other Lumino ecosystem components. Those are: 

- [Lumino hub](https://github.com/rsksmart/lumino) for channel creation and payment handling.
- [RIF Notifier](https://github.com/rsksmart/rif-notifier) to watch on-chain events and validate HUB operations.
- [RSK node](https://github.com/rsksmart/rskj) to interact directly with the RSK blockchain.


In order to use this example, you must have a Lumino HUB, RIF Notifier and a RSK node up and running. Also, you must set the RNS registry address for your environment (https://developers.rsk.co/rif/rns/specs/registry/)

Then, just modify the `.env` file: 

```
REACT_APP_ADDRESS=0x9f931600e2301Cc290f3b541B87AD92cC267849f
REACT_APP_PRIVATE_KEY=0x60dc323d7041f527d8898ddf72a2b23dc8b3c13d0f4a75f3fdc01656faf8c3d9
REACT_APP_CHAIN_ID=33
REACT_APP_RSK_ENDPOINT=http://localhost:4444
REACT_APP_HUB_ENDPOINT=http://localhost:5000/api/v1/
REACT_APP_RNS_REGISTRY_CONTRACT_ADDRESS=0x45aA64F4A3A4BaCb863B6235968c9fFBbd6D4778
REACT_APP_TOKEN_NETWORK_ADDRESSES=0x04b7fc01613b59311EBB373B30f365F1894213e2,0xF924562C30614FFB87f440Bf88be49579b2Fb953
REACT_APP_NOTIFIER_ENDPOINTS=http://127.0.0.1:8081,http://127.0.0.1:8082,http://127.0.0.1:8083
```

* **REACT_APP_ADDRESS**: the account address to use on this application
* **REACT_APP_PRIVATE_KEY**: the private key for the account address used in **REACT_APP_ADDRESS**
* **REACT_APP_CHAIN_ID**: the RSK chain id that you want to connect to (ex: 33). Valid values are: 30 (MAINNET), 31(TESTNET) or 33(REGTEST))
* **REACT_APP_RSK_ENDPOINT**: the RSK server endpoint to connect to
* **REACT_APP_HUB_ENDPOINT**: the Hub endpoint to connect to
* **REACT_APP_RNS_REGISTRY_CONTRACT_ADDRESS**: the RNS Registry Contract Address of the contract deployed on the network
* **REACT_APP_TOKEN_NETWORK_ADDRESSES**: the list of token network addresses that we are going to use (should be all the addresses of the deployed token networks)
* **REACT_APP_NOTIFIER_ENDPOINTS**: the list of notifier endpoints to listen to

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

