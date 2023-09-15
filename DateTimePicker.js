import React                from 'react'
import {StyleSheet, View}   from 'react-native'
import NativeDateTimePicker from '@react-native-community/datetimepicker'
import {Text}               from 'react-native-elements'
import moment               from 'moment-timezone'
import IconButton           from './IconButton'
import theme, {colors}      from '../theme'

export class DateTimePicker extends React.Component {
  state = {
    date: new Date(),
    show: false,
  }

  handleChange(newDate) {
    this.setState(prevState => ({
      date: newDate || prevState.date,
    }), () => {
      this.props.onChange(this.state.date)
    })
  }

  componentDidMount() {
    if (this.props.value) {
      this.setState({date: this.props.value})
    }
  }

  render() {
    const {
            date,
            show,
          } = this.state
    const {
            mode     = 'date',
            label,
            format   = 'M/D/YY',
            disabled = false,
          } = this.props

    return (
      <View>
        {!!label && (
          <Text style={styles.fieldLabelText}>
            {label}
          </Text>
        )}
        <View style={styles.textContainer}>
          <Text
            style={StyleSheet.flatten([
              styles.fieldValueText,
              disabled && styles.fieldValueTextDisabled,
            ])}
          >
            {moment(date).format(format)}
          </Text>
          <IconButton
            name={show ? 'times' : 'calendar'}
            background={colors.primary}
            disabled={disabled}
            onPress={() => this.setState(prevState => ({show: !prevState.show}))}
          />
        </View>
        {(show && !disabled) && (
          <NativeDateTimePicker
            mode={mode}
            value={date}
            onChange={(event, newDate) => this.handleChange(newDate)}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textContainer: {
    ...theme.Input.inputStyle,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 16,
    paddingBottom: 16,
  },
  fieldLabelText: {
    fontSize: 17,
    lineHeight: 17,
    marginBottom: 12,
  },
  fieldValueText: {
    fontSize: 22,
    lineHeight: 22,
    marginBottom: 0,
  },
  fieldValueTextDisabled: {
    color: '#BBBCBD',
  },
})

export default DateTimePicker
