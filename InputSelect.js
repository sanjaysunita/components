import React              from 'react'
import {StyleSheet, View} from 'react-native'
import SelectInput        from 'react-native-select-input-ios'
import {Text}             from 'react-native-elements'
import theme              from '../theme'

class InputSelect extends React.Component {
  render() {
    const {
            label,
            value,
            options,
            onChange,
            disabled,
            inputStyle,
            inputTextStyle,
          } = this.props
    return (
      <View>
        <Text style={theme.Input.labelStyle}>
          {label}
        </Text>
        <SelectInput
          value={value}
          options={options}
          onSubmitEditing={value => onChange(value)}
          enabled={!disabled}
          mode="dropdown"
          style={StyleSheet.flatten([
            styles.selectInput,
            inputStyle,
          ])}
          labelStyle={StyleSheet.flatten([
            styles.selectInputText,
            inputTextStyle,
          ])}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  selectInput: {
    backgroundColor: theme.Input.inputStyle.backgroundColor,
    paddingLeft: theme.Input.inputStyle.paddingLeft,
    paddingRight: theme.Input.inputStyle.paddingRight,
    paddingTop: theme.Input.inputStyle.paddingTop,
    paddingBottom: theme.Input.inputStyle.paddingBottom,
    borderRadius: theme.Input.inputStyle.borderRadius,
  },
  selectInputText: {
    fontSize: theme.Input.inputStyle.fontSize,
  },
})

export default InputSelect
