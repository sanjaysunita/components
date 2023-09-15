import React                    from 'react'
import {StyleSheet, Text, View} from 'react-native'
import ProgressIndicator        from './ProgressIndicator'
import {colors}                 from '../theme'

export default (
  {
    rep,
    totalReps,
    repsText = ['rep', 'reps'],
    remainingText = 'to go',
    countdown = 0,
  }
) => {
  const progress      = Math.round(100 / (totalReps / rep))
  const remainingReps = totalReps - rep
  const repsVerbiage  = remainingReps === 1 ? repsText[0] : repsText[1]
  return (
    <View>
      <ProgressIndicator progress={progress}/>
      <View style={styles.textContainer}>
        {countdown === 0 && (
          <View>
            <Text style={styles.repsTextContainer}>
              <Text style={styles.remainingRepsText}>{remainingReps}</Text>
              <Text>&nbsp;{repsVerbiage}</Text>
            </Text>
            <Text style={styles.toGoText}>
              {remainingText}
            </Text>
          </View>
        )}
        {countdown > 0 && (
          <Text style={StyleSheet.flatten([styles.repsTextContainer, styles.countdownText])}>
            {countdown}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
  },
  repsTextContainer: {
    fontSize: 26,
    textAlign: 'center',
  },
  remainingRepsText: {
    color: colors.primary,
  },
  toGoText: {
    color: '#A7B1CC',
    fontSize: 19,
    textAlign: 'center',
  },
  countdownText: {
    fontSize: 64,
    color: colors.primary,
  },
})
