import React              from 'react'
import {View, StyleSheet} from 'react-native'
import {Text}             from 'react-native-elements'
import ListItem           from './ListItem'
import ProgressBar        from './ProgressBar'
import IconStyled         from './IconStyled'
import {colors}           from '../theme'

export default (
  {
    title,
    icon = undefined,
    sets = 0,
    reps = 0,
    progress = [], // array of objects like [{ reps: 10, time: 34 }, ...]
    completed = false,
  }
) => {
  const completedReps = progress.reduce((total, {reps: setReps}) => total + setReps, 0)
  return (
    <ListItem style={{paddingLeft: 0, paddingRight: 0}}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          {!completed && (
            <View>
              <Text style={{marginBottom: 0}}>
                <Text style={styles.metaNumber}>{reps}&nbsp;</Text>
                <Text style={styles.metaText}>repetitions</Text>
                <Text style={styles.separator}>&nbsp;&bull;&nbsp;</Text>
                <Text style={styles.metaNumber}>{sets}&nbsp;</Text>
                <Text style={styles.metaText}>sets</Text>
              </Text>
              <ProgressBar
                progress={(completedReps / (sets * reps)) * 100}
                width="50%"
                size="small"
                style={styles.progressBar}
              />
            </View>
          )}
          {completed && (
            <View style={styles.completedContainer}>
              <IconStyled
                name="check"
                color={colors.lightBlue}
                background={colors.superLightBlue}
                size={16}
              />
              <Text style={styles.completedText}>Activity Completed</Text>
            </View>
          )}
        </View>
        {icon && (
          <View>
            {icon}
          </View>
        )}
      </View>
    </ListItem>
  )
}

const styles = StyleSheet.create({})
