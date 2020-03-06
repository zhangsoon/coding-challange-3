import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
} from 'react-navigation';
import Scenes from '../scenes/index';
import HomeMenuDrawer from '../scenes/HomeMenuDrawer';
import {viewPortWidth} from '../utils/Scaling';

const HomeDrawerMenuNavigator = createDrawerNavigator(
  {
    Main: {
      screen: Scenes.Main,
    },
  },
  {
    contentComponent: props => <HomeMenuDrawer {...props} />,
    hideStatusBar: false,
    drawerWidth: viewPortWidth * 0.65,
    drawerBackgroundColor: 'rgba(255,255,255,1)',
    overlayColor: 'rgba(0,0,0,0.7)',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
  },
);

const AppNavigator = createStackNavigator(
  {
    MainScreen: {
      screen: HomeDrawerMenuNavigator,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
  },
  {
    navigationOptions: ({navigation}) => {
      return {
        header: null,
        mode: 'modal',
      };
    },
  },
);

const LoginNavigator = createStackNavigator(
  {
    Login: {
      screen: Scenes.Login,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
    SignUp: {
      screen: Scenes.SignUp,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
  },
  {
    navigationOptions: ({navigation}) => {
      return {};
    },
  },
);

const SwitchNavigator = createSwitchNavigator({
  SplashScreen: Scenes.SplashScreen,
  App: AppNavigator,
  LoginScreen: LoginNavigator,
});

export default createAppContainer(SwitchNavigator);
