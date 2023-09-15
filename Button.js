import React        from 'react'
import {StyleSheet} from 'react-native'
import {Button}     from 'react-native-elements'
import {colors}     from '../theme'

export default (props) => {
  const {type, ...passThroughProps} = props
  const passThroughType             = type !== 'secondary' ? type : undefined
  return (
    <Button
      {...passThroughProps}
      type={passThroughType}
      buttonStyle={StyleSheet.flatten([
        styles.default,
        props.type === 'secondary' && styles.secondaryButton,
        props.margin && styles.margin,
        props.buttonStyle && props.buttonStyle,
      ])}
      titleStyle={StyleSheet.flatten([
        props.type === 'secondary' && styles.secondaryTitle,
        props.titleStyle && props.titleStyle,
      ])}
    />
  )
}

const styles = StyleSheet.create({
  default: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 32,
    paddingLeft: 32,
    borderRadius: 10,
  },
  margin: {
    marginBottom: 16,
  },
  secondaryButton: {
    backgroundColor: '#DCF3F7',
  },
  secondaryTitle: {
    color: colors.primary,
  },
})
