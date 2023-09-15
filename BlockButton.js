import React                                from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import IconStyled                           from './IconStyled'
import {shadows}                            from '../theme'

export default (
  {
    title,
    icon,
    iconComponent,
    onPress,
    color,
    background,
    style = {},
    iconStyle = {},
    textStyle = {},
    children,
  }
) => (
  <TouchableOpacity
    onPress={onPress}
    style={StyleSheet.flatten([styles.container, style])}
  >
    {icon && (
      <IconStyled
        name={icon}
        color={color}
        background={background}
        style={StyleSheet.flatten([styles.icon, iconStyle])}
        square
      />
    )}
    {iconComponent}
    <Text style={textStyle}>
      {title}
    </Text>
    {children}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 12,
    ...shadows.section,
  },
  icon: {
    marginBottom: 16,
  },
})
