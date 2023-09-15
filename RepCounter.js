import React                    from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Svg, Circle}            from 'react-native-svg'
import {colors}                 from '../theme'

export default ({reps, totalReps}) => {
  const size             = 5
  const radius           = size * 20
  const stroke           = size * 2
  const innerStroke      = stroke / 2
  const normalizedRadius = radius - stroke * 2
  const circumference    = normalizedRadius * 2 * Math.PI
  return (
    <View style={styles.container}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        style={styles.svgContainer}
      >
        <Circle
          strokeWidth={innerStroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          stroke={colors.superLightBlue}
          fill="transparent"
        />
        <Circle
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - (reps / totalReps) * circumference}
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
          stroke={colors.lightBlue}
          fill="transparent"
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.topTextContainer}>
          <Text style={styles.repCountText}>
            {totalReps - reps}
          </Text>
          <Text style={styles.repsText}>
            &nbsp;rep{totalReps - reps === 1 ? '' : 's'}
          </Text>
        </Text>
        <View>
          <Text style={styles.toGoText}>
            to go
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
  },
  svgContainer: {
    position: 'absolute',
    height: 200,
    width: 200,
    transform: [{rotate: '-90deg'}],
  },
  topTextContainer: {
    marginBottom: 16,
  },
  repCountText: {
    fontSize: 26,
    textAlign: 'center',
    color: colors.lightBlue,
  },
  repsText: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 160,
  },
  toGoText: {
    textAlign: 'center',
    fontSize: 19,
    color: colors.lightGray,
  },
})
