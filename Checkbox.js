import React        from 'react'
import {StyleSheet} from 'react-native'
import {CheckBox}   from 'react-native-elements'
import {colors}     from '../theme'

export default ({title, checked, onPress, type = 'checkbox'}) => (
  <CheckBox
    checked={checked}
    title={title}
    onPress={onPress}
    checkedIcon={type === 'checkbox' ? 'check-square-o' : 'dot-circle-o'}
    uncheckedIcon={type === 'checkbox' ? 'square-o' : 'circle-o'}
    checkedColor={colors.primary}
    uncheckedColor={colors.lightGray}
    containerStyle={styles.container}
    textStyle={styles.text}
  />
)

const styles = StyleSheet.create({
  container: {
    marginLeft: 0,
    marginBottom: 8,
    paddingBottom: 0,
    paddingLeft: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  text: {
    marginBottom: 0,
    fontWeight: 'normal',
  },
})
