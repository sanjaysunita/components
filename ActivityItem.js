import React                  from 'react'
import {StyleSheet, View}     from 'react-native'
import {Text}                 from 'react-native-elements'
import moment                 from 'moment-timezone'
import ListItem               from './ListItem'
import IconStyled             from './IconStyled'
import Icon                   from './Icon'
import {colors}               from '../theme'
import {getActivityIconProps} from '../utils/activity'

const today = moment()

export default (
  {
    activity = {},
    assignment,
    date,
    flat = false,
    allowDisabled = true,
    onPress = () => null,
    style = {},
    titleStyle = {},
  }
) => {
  const Tag      = flat ? View : ListItem
  const locked   = date && date.isAfter(today, 'day')
  const complete = assignment && assignment.status === 'complete'
  const isMissed = !['informational', 'survey'].includes(activity.type) &&
    !complete && date && date.isBefore(today, 'day')
  return (
    <Tag
      onPress={(!locked && !complete && !flat && !isMissed) && onPress}
      style={StyleSheet.flatten([
        styles.container,
        (allowDisabled && (locked || isMissed)) && styles.disabled,
        style,
      ])}
    >
      <View style={styles.activityLeft}>
        {/* NAME */}
        <Text
          style={StyleSheet.flatten([
            styles.activityTitle,
            titleStyle,
          ])}
        >
          {activity.name}
        </Text>

        {/* PHYSICAL ACTIVITY INFORMATION */}
        {activity.type === 'physical' && (
          <View style={StyleSheet.flatten([styles.activityContent, styles.activityContentExercise])}>
            {(!isMissed && assignment && !complete) && (
              <View style={styles.activityTextContainer}>
                <Text style={styles.activityTextEmphasis}>{assignment.parent.reps}</Text>
                <Text style={styles.activityText}>
                  &nbsp;repetition{assignment.parent.reps.length === 1 ? '' : 's'}
                </Text>
                <Text style={styles.activityTextBullet}>&nbsp;{'\u2B24'}</Text>
                <Text style={styles.activityTextEmphasis}>{assignment.parent.sets}</Text>
                <Text style={styles.activityText}>
                  &nbsp;set{assignment.parent.sets.length === 1 ? '' : 's'}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* MISSED */}
        {isMissed && (
          <View style={StyleSheet.flatten([styles.activityContent, styles.activityContentExercise])}>
            <IconStyled
              name="times"
              color={colors.salmon}
              background="#F6EDEC"
              size={16}
            />
            <Text style={styles.activityTextMissed}>
              Missed
            </Text>
          </View>
        )}

        {/* COMPLETE */}
        {complete && (
          <View style={StyleSheet.flatten([styles.activityContent, styles.activityContentExercise])}>
            <IconStyled
              name="check"
              color={colors.primary}
              background="#D3F4F8"
              size={16}
            />
            <Text style={styles.activityTextCompleted}>
              Completed
            </Text>
          </View>
        )}
      </View>

      {/* ICON */}
      <View style={styles.activityRight}>
        {locked && (
          <Icon
            name="lock"
            color={colors.primary}
            size={48}
          />
        )}
        {!locked && (
          <IconStyled {...getActivityIconProps(activity.type)}/>
        )}
      </View>
    </Tag>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 16,
  },
  disabled: {
    backgroundColor: '#F6F6F6',
    shadowOpacity: 0,
  },
  activityLeft: {
    flex: 4,
    justifyContent: 'center',
  },
  activityRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 8,
  },
  activityTitle: {
    fontSize: 19,
    marginBottom: 8,
  },
  activityContent: {
    marginBottom: 0,
  },
  activityContentExercise: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityTextEmphasis: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 0,
  },
  activityTextBullet: {
    fontSize: 4,
    marginHorizontal: 4,
    color: colors.lightGray,
    marginBottom: 0,
  },
  activityText: {
    color: colors.lightGray,
    marginBottom: 0,
  },
  activityTextContainer: {
    flexDirection: 'row',
  },
  activityTextMissed: {
    color: colors.salmon,
    marginBottom: 0,
    marginLeft: 8,
  },
  activityTextCompleted: {
    color: colors.primary,
    marginBottom: 0,
    marginLeft: 8,
  },
})
