import React                     from 'react'
import {Image, StyleSheet, View} from 'react-native'
import Icon                      from './Icon'
import {colors}                  from '../theme'

const sizes = {
  sm: {
    containerStyles: {
      width: 40,
      height: 40,
      borderRadius: 16,
    },
    iconSize: 24,
  },
  md: {
    containerStyles: {
      width: 64,
      height: 64,
      borderRadius: 24,
    },
    iconSize: 32,
  },
  lg: {
    containerStyles: {
      width: 96,
      height: 96,
      borderRadius: 36,
    },
    iconSize: 56,
  },
}

export default (
  {
    imageSource: uri,
    size = 'lg',
    style,
  }
) => (
  <View
    style={StyleSheet.flatten([
      styles.container,
      sizes[size].containerStyles,
      style,
    ])}
  >
    {uri && (
      <Image
        source={{uri}}
        style={sizes[size].containerStyles}
      />
    )}
    {!uri && (
      <Icon
        name="avatar"
        color={colors.primary}
        size={sizes[size].iconSize}
        style={styles.icon}
      />
    )}
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightBlue,
  },
})
