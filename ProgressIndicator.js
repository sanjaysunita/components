import React              from 'react'
import {StyleSheet, View} from 'react-native'
import {Circle, Svg}      from 'react-native-svg'
import {colors}           from '../theme'

export default (
  {
    size = 100,
    progress = 0,
  }
) => {
  const radius           = size
  const strokeWidth      = size * .08
  const dimension        = radius * 2
  const normalizedRadius = radius - strokeWidth * 2
  const circumference    = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - progress / 100 * circumference

  return (
    <View style={styles.progressContainer}>
      <Svg
        height={dimension}
        width={dimension}
        viewBox={`0 0 ${dimension} ${dimension}`}
      >
        <Circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          stroke="#E3EBEF"
          fill="none"
        />
        <Circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          stroke={colors.primary}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  progressContainer: {
    alignItems: 'center',
    transform: [
      {rotate: '-90deg'},
    ],
  },
})
