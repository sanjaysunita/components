import React              from 'react'
import {View, StyleSheet} from 'react-native'
import Button             from './Button'
import theme              from '../theme'

export default class extends React.Component {
  render() {
    const {
            primaryTitle,
            secondaryTitle,
            primaryDisabled   = false,
            secondaryDisabled = false,
            onPrimaryPress,
            onSecondaryPress,
            style,
          } = this.props
    return (
      <View style={StyleSheet.flatten([styles.buttonContainer, style])}>
        {(!!secondaryTitle && !!onPrimaryPress) && (
          <Button
            title={secondaryTitle}
            type="secondary"
            disabled={secondaryDisabled}
            onPress={onSecondaryPress}
            containerStyle={styles.button}
          />
        )}
        <Button
          title={primaryTitle}
          onPress={onPrimaryPress}
          disabled={primaryDisabled}
          containerStyle={styles.button}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 16,
  },
})
