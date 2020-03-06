import _ from "lodash"

export const getIsRehydrationCompleted = state => _.get(state,["isRehydrationCompleted"],false)


