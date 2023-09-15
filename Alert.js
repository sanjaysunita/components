import React        from 'react'
import {StyleSheet} from 'react-native'
import {Text}       from 'react-native-elements'
import ListItem     from './ListItem'
import IconStyled   from './IconStyled'
import {colors}     from '../theme'

export default (
  {
    level = 'error',
    message,
    style = {},
    children,
  }
) => {
  const {icon, color, background} = {
    error: {
      icon: 'info',
      color: '#ffffff',
      background: colors.error,
    },
    info: {
      icon: 'info',
      color: '#ffffff',
      background: colors.primary,
    },
  }[level]
  return (
    <ListItem style={StyleSheet.flatten([styles.container, style])}>
      <IconStyled
        name={icon}
        color={color}
        background={background}
        size={16}
        style={styles.icon}
      />
      {children}
      {(!children && message) && (
        <Text style={{marginBottom: 0, flex: 1}}>{message}</Text>
      )}
    </ListItem>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    marginRight: 12,
  },
})
