import React                                from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {shadows}                            from '../theme'

export default (
  {
    children,
    disabled,
    onPress,
    flat = false,
    style = {},
    ...passThroughProps
  }
) => {
  const Tag = !onPress || disabled ? View : TouchableOpacity
  return (
    <Tag
      onPress={!disabled ? onPress : undefined}
      style={StyleSheet.flatten([
        styles.default,
        flat ? styles.flat : styles.notFlat,
        disabled && styles.disabled,
        style,
      ])}
      {...passThroughProps}
    >
      {children}
    </Tag>
  )
}

const styles = StyleSheet.create({
  default: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  notFlat: {
    marginBottom: 8,
    ...shadows.listItem,
  },
  flat: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3EBEF',
    paddingVertical: 16,
    paddingLeft: 0,
  },
  disabled: {
    backgroundColor: '#ececec',
  },
})
