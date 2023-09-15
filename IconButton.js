import React              from 'react'
import {TouchableOpacity} from 'react-native'
import IconStyled         from './IconStyled'
import Icon               from './Icon'
import {colors}           from '../theme'

const getTypeColor = (type) => {
  switch (type) {
    case 'secondary':
      return colors.lightBlue
    case 'primary':
    default:
      return 'white'
  }
}

const getTypeBackground = (type) => {
  switch (type) {
    case 'secondary':
      return colors.superLightBlue
    case 'primary':
    default:
      return colors.lightBlue
  }
}

export default (
  {
    name,
    type = 'primary',
    color,
    background,
    square = false,
    flat = false,
    size,
    onPress,
    disabled = false,
    border = false,
    style = {},
    iconStyle = {},
  }
) => (
  <TouchableOpacity
    onPress={onPress}
    style={style}
    disabled={disabled}
  >
    {flat && (
      <Icon
        name={name}
        color={color || getTypeColor(type)}
        style={iconStyle}
        size={size}
        disabled={disabled}
      />
    )}
    {!flat && (
      <IconStyled
        name={name}
        color={color || getTypeColor(type)}
        background={background || getTypeBackground(type)}
        square={square}
        style={iconStyle}
        size={size}
        disabled={disabled}
        border={border}
      />
    )}
  </TouchableOpacity>
)
