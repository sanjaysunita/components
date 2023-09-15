import React                                   from 'react'
import {Platform, StatusBar, StyleSheet, View} from 'react-native'
import {ThemeProvider}                         from 'react-native-elements'
import {SafeAreaConsumer}                      from 'react-native-safe-area-context'
import BottomNavigation                        from './BottomNavigation'
import Notifications                           from './Notifications'
import KeyboardShift                           from './KeyboardShift'
import ApiListener                             from './ApiListener'
import theme, {colors, shadows}                from '../theme'

export default class Screen extends React.Component {
  render() {
    const {
            footer,
            footerStyle,
            style,
            children,
            showBottomNavigation = false,
          } = this.props
    return (
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.superLightBlue}
        />
        <ApiListener>
          <SafeAreaConsumer>
            {insets => (
              <View style={{flex: 1}}>
                <KeyboardShift
                  style={StyleSheet.flatten([
                    {paddingTop: insets.top, flex: 1},
                    style,
                  ])}
                >
                  {children}
                  <View
                    style={StyleSheet.flatten([
                      styles.footerContainer,
                      (footer || showBottomNavigation) && styles.footer,
                      footerStyle,
                    ])}
                  >
                    {footer}
                    {(!footer && showBottomNavigation) && (
                      <BottomNavigation/>
                    )}
                  </View>
                </KeyboardShift>
                <Notifications/>
              </View>
            )}
          </SafeAreaConsumer>
        </ApiListener>
      </ThemeProvider>
    )
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 'auto',
    backgroundColor: '#ffffff',
  },
  footer: {
    padding: 16,
    ...shadows.soft,
    ...Platform.select({
      android: {elevation: 25},
    }),
  },
})
