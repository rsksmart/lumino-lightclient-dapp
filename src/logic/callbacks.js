import { createLogic } from "redux-logic";

import { PAYMENT_RECEIVED } from "../constants/action-types";

export default [
  createLogic({
    type: PAYMENT_RECEIVED,
    process({ getState, action }, dispatch, done) {
      (async () => {
        done();
      })();
    }
  })
];
