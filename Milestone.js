import React              from 'react'
import {StyleSheet, View} from 'react-native'
import {Text}             from 'react-native-elements'
import moment             from 'moment-timezone'
import Icon               from './Icon'
import {colors}           from '../theme'

const milestoneWidth = 116

export default (
  {
    milestone,
    assignment,
    style = {},
  }
) => {
  const {name}                = milestone
  const {status, completedOn} = assignment

  const color = {
    pending: '#e4e4e4',
    complete: colors.primary,
    skipped: colors.lightGray,
  }[status]

  return (
    <View
      style={StyleSheet.flatten([
        styles.default,
        style,
      ])}
    >
      <Icon
        name={`milestone-${status}`}
        color={color}
        size={milestoneWidth}
        style={styles.icon}
      />
      <Text style={styles.titleText}>
        {name}
      </Text>
      {status === 'complete' && (
        <Text style={styles.dateText}>
          {moment(completedOn).format('MM/D')}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  default: {
    width: milestoneWidth + 16,
    alignItems: 'center',
  },
  icon: {
    height: 72,
  },
  titleText: {
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 16,
  },
  dateText: {
    color: colors.lightGray,
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: 16,
  },
})
