import React from 'react'
import {createAppContainer} from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import {Transition} from 'react-native-reanimated'
import AppNavigator from '../navigators/App'
import AuthNavigator from '../navigators/Auth'
import AuthLoadingScreen from '../screens/auth/Loading'
import ErrorScreen from '../screens/Error'

export default class AppContainer extends React.Component {
  render() {
    const Container = createAppContainer(
      createAnimatedSwitchNavigator(
        {
          AuthLoading: AuthLoadingScreen,
          App: AppNavigator,
          Auth: AuthNavigator,
          Error: ErrorScreen,
        },
        {
          initialRouteName: 'AuthLoading',
          transition: (
            <Transition.Together>
              <Transition.Out type="slide-left"/>
              <Transition.In type="slide-right"/>
            </Transition.Together>
          ),
        },
      ))
    return (
      <Container/>
    )
  }
}
