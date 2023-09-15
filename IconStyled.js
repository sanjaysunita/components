import React              from 'react'
import {View, StyleSheet} from 'react-native'
import Icon               from './Icon'

export default (
  {
    name,
    color,
    background,
    square = false,
    disabled = false,
    size = 24,
    border = false,
    style = {},
  }
) => (
  <View
    style={StyleSheet.flatten([
      {
        backgroundColor: background,
        height: size * 1.75,
        width: size * 1.75,
        borderRadius: square ? size * 0.375 : 100,
      },
      styles.default,
      disabled && styles.disabled,
      border && {
        borderWidth: 2,
        borderColor: color,
      },
      style,
    ])}
  >
    <Icon
      name={name}
      color={color}
      size={size}
    />
  </View>
)

const styles = StyleSheet.create({
  default: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: .5,
  },
})
