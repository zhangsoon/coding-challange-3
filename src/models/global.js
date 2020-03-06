
import Immutable from "seamless-immutable";
import * as globalAction from "../actions/global";
import NavigationService from "../navigation/NavigationService";
import * as selectors from "../selectors/index";

export default () => {

  const INITIAL_STATE = Immutable({
    isRehydrationCompleted: false,
  });

  return {
    namespace: "global",
    state: INITIAL_STATE,
    reducers: {
      REHYDRATE_COMPLETED(state) {
        return state.setIn(["isRehydrationCompleted"], true);
      }
    },
    effects: {
    }
  };
};
