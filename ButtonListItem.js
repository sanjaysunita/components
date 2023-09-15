import React              from 'react'
import {View, StyleSheet} from 'react-native'
import Icon               from './Icon'
import ListItem           from './ListItem'
import {colors}           from '../theme'

export default (
  {
    flat = false,
    disabled,
    children,
    icon,
    onPress,
    style,
    iconStyle = {},
  }
) => {
  let finalIcon = icon
  if (!icon) finalIcon = flat ? 'arrow-right' : 'chevron-right'
  return (
    <ListItem
      onPress={onPress}
      flat={flat}
      disabled={disabled}
      style={StyleSheet.flatten([
        styles.container,
        style,
      ])}
    >
      <View style={{flex: 1, justifyContent: 'center'}}>
        {children}
      </View>
      {(icon !== false && finalIcon) && (
        <Icon
          name={finalIcon}
          color={iconStyle.color || colors.primary}
          style={StyleSheet.flatten([
            styles.icon,
            iconStyle,
          ])}
        />
      )}
    </ListItem>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    marginBottom: 16,
  },
  containerDefault: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3EBEF',
  },
  icon: {
    marginLeft: 16,
  },
})
