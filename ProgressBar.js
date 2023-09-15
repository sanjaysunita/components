import React              from 'react'
import {View, StyleSheet} from 'react-native'

export default (
  {
    progress,
    width = '100%',
    height = 8,
    style = {},
  }
) => (
  <View style={{...styles.container, width, height, ...style}}>
    <View style={{...styles.fill, width: `${Math.min(100, progress)}%`}}/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C6E6EA',
    borderRadius: 100,
    marginBottom: 8,
  },
  fill: {
    height: '100%',
    backgroundColor: '#269EAE',
    borderRadius: 100,
  },
})
