/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import dva from 'dva-no-router';
import RootNavigator from './src/navigation/RootNavigator';
import createLoading from 'dva-loading';
import {registerModels} from './src/models';
import Immutable from 'seamless-immutable';
import {persistReducer, persistStore, createTransform} from 'redux-persist';
import {createWhitelistFilter} from 'redux-persist-transform-filter';
import * as globalAction from './src/actions/global';
import AsyncStorage from '@react-native-community/async-storage';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Require cycle:',
  'componentWillUpdate',
  'componentWillReceiveProps',
  'Virtualized',
  'componentWillMount',
]);

const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // convert mySet to an Array.
    return {...inboundState};
  },
  // transform state being rehydrated
  (outboundState, key) => {
    if (outboundState) {
      outboundState.mergeDeep = x => x;
    }
    return Immutable(outboundState);
  },
);

const saveSubsetWhiteListGlobal = createWhitelistFilter('global');
const saveSubsetWhiteListAuth = createWhitelistFilter('auth', ['user', 'currentUser']);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [SetTransform, saveSubsetWhiteListGlobal, saveSubsetWhiteListAuth],
  whitelist: ['global', 'auth'],
};

const app = dva({
  onReducer: rootReducer => persistReducer(persistConfig, rootReducer),
});

app.use(createLoading({effects: true}));

registerModels(app);

app.router(() => <RootNavigator />);

const App = app.start();

persistStore(app._store, null, () => app._store.dispatch(globalAction.setRehydrateCompleted()));

export default App;
