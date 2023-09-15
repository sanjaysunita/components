import React              from 'react'
import {StyleSheet, View} from 'react-native'
import {Text}             from 'react-native-elements'
import Overlay            from './Overlay'
import Button             from './Button'

export default class extends React.Component {
  render() {
    const {
            cancelText  = 'No, let\'s continue',
            confirmText = 'Yes, I want to exit',
            onCancelExit,
            onExit,
            isVisible,
            children,
          } = this.props
    return (
      <Overlay
        isVisible={isVisible}
        dismissible={false}
        hasAction={false}
        height={320}
      >
        <View style={{width: '100%'}}>
          {children}
          {!children && (
            <View>
              <Text style={styles.exitText}>
                Are you sure you want to exit?
              </Text>
              <Text style={styles.exitText}>
                You will lose all your progress.
              </Text>
            </View>
          )}
          <Button
            title={cancelText}
            containerStyle={styles.exitButton}
            onPress={onCancelExit}
          />
          <Button
            title={confirmText}
            containerStyle={styles.exitButton}
            onPress={onExit}
          />
        </View>
      </Overlay>
    )
  }
}

const styles = new StyleSheet.create({
  exitText: {
    fontSize: 22,
    color: '#21ACBE',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 0,
  },
  exitButton: {
    marginTop: 24,
    width: '100%',
  },
})
